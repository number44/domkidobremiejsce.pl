<?php
namespace App\Services;

use WP_Error;
class Service
{
    protected $table_name;
    protected $allowed_table_columns = []; // Define this with actual column names for your table
    protected $allowed_join_tables = []; // NEW: Define allowed tables for joining
    protected $allowed_join_types = ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN']; // Standard SQL join types

    public function __construct(string $table_name, array $allowed_table_columns = [], array $allowed_join_tables = [])
    {
        $this->table_name = $table_name;
        $this->allowed_table_columns = $allowed_table_columns;
        $this->allowed_join_tables = $allowed_join_tables;

    }
    // Sanitizers
    protected function sanitizeData($data)
    {
        $sanitized_data = [];
        foreach ($data as $key => $value) {
            if (is_string($value)) {
                $sanitized_data[$key] = sanitize_text_field($value); // Good for general text
            } elseif (is_int($value)) {
                $sanitized_data[$key] = intval($value); // Ensure it's an integer
            } elseif (is_float($value)) {
                $sanitized_data[$key] = floatval($value); // Ensure it's a float
            } elseif (is_bool($value)) {
                $sanitized_data[$key] = (int) $value; // Convert bool to 0 or 1 for database storage
            } elseif (is_array($value)) {
                // For arrays, recursively sanitize if you expect nested arrays/objects
                // Or use array_map only if you know all elements are text
                $sanitized_data[$key] = array_map('sanitize_text_field', $value); // Still assumes text in sub-array
                // A more robust recursive solution for mixed arrays:
                // $sanitized_data[$key] = $this->sanitizeData($value);
            } else {
                // Fallback for other types, e.g., objects, null, etc.
                // You might want to handle these specifically or throw an error.
                $sanitized_data[$key] = $value; // Pass through if type not explicitly handled
            }
        }
        return $sanitized_data;
    }
    protected function formatData($data)
    {
        $formatted_data = [];
        foreach ($data as $key => $value) {
            if (is_int($value)) {
                $formatted_data[$key] = '%d';
            } elseif (is_float($value)) {
                $formatted_data[$key] = '%f';
            }
            // If your sanitizeData converts bools to int (0/1), they will correctly be %d here.
            // Otherwise, bools, null, and other non-numeric scalars will default to %s.
            else {
                $formatted_data[$key] = '%s';
            }
        }
        return $formatted_data;
    }
    protected function sanitizeDataWithHtml($data)
    {
        $sanitized_data = [];
        foreach ($data as $key => $value) {
            if (str_ends_with($key, '_html')) {
                // Get the default allowed HTML for 'post' context
                $allowed_html = wp_kses_allowed_html('post');
                // Add or modify iframe to the allowed list
                $allowed_html['iframe'] = array(
                    'class' => true,
                    'width' => true,
                    'height' => true,
                    'src' => array(
                        // Crucially, restrict the 'src' to only allow YouTube embed URLs
                        'https://www.youtube-nocookie.com/embed/',
                        'https://www.youtube.com/embed/', // Also allow standard YouTube domain
                    ),
                    'frameborder' => true,
                    'allow' => true, // e.g., allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    'allowfullscreen' => true,
                    'title' => true,
                    'autoplay' => true,
                    'controls' => true,
                    'loop' => true,
                    'modestbranding' => true,
                    'rel' => true,
                    'start' => true,
                    'end' => true,
                    'playlist' => true,
                    'origin' => true,
                    'ivloadpolicy' => true, // Often seen in YouTube embeds
                    'disablekbcontrols' => true,
                    'enableiframeapi' => true,
                    'cc_load_policy' => true,
                    'cc_lang_pref' => true,
                    'autohide' => true,
                    'color' => true,
                    'fs' => true,
                    'hl' => true,
                    'showinfo' => true,
                    'iv_load_policy' => true, // Corrected casing
                );

                // If your div wrapper has specific data attributes, add them:
                $allowed_html['div']['data-youtube-video'] = true;
                // You might also need other div attributes if Tiptap adds them, e.g., class
                $allowed_html['div']['class'] = true;

                // Apply wp_kses with the modified allowed HTML
                $sanitized_data[$key] = wp_kses($value, $allowed_html);
            } else {
                // For other fields, use the default sanitize_text_field
                $sanitized_data[$key] = is_array($value) ? array_map('sanitize_text_field', $value) : sanitize_text_field($value);
            }
        }
        return $sanitized_data;
    }
    protected function sanitizeDataWithHtmlNoIframe($data)
    {
        $sanitized_data = [];
        foreach ($data as $key => $value) {
            if (str_ends_with($key, '_html')) {
                // For fields ending with '_html', allow HTML using wp_kses_post
                // or you could use wp_kses with a custom allowed tags array for more control.
                $sanitized_data[$key] = wp_kses_post($value);
            } else {
                // For other fields, use the default sanitize_text_field
                $sanitized_data[$key] = is_array($value) ? array_map('sanitize_text_field', $value) : sanitize_text_field($value);
            }
        }
        return $sanitized_data;
    }
    protected function sanitizeColumnName(string $column_name): string
    {
        // Whitelist valid columns from the primary table
        if (in_array($column_name, $this->allowed_table_columns)) {
            return $column_name;
        }
        // Also check if it's a qualified column name (e.g., table_alias.column_name)
        if (preg_match('/^([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)$/', $column_name, $matches)) {
            $alias = $matches[1];
            $col_name = $matches[2];
            // If the alias is a valid join alias AND the column name is allowed for that table
            foreach ($this->allowed_join_tables as $join_alias => $join_table_config) {
                if ($alias === $join_alias && in_array($col_name, $join_table_config['columns'])) {
                    return "{$alias}.{$col_name}";
                }
            }
        }
        error_log("Attempted to query disallowed column: '{$column_name}' from table '{$this->table_name}'.");
        return '';
    }
    protected function sanitizeJoinTable(string $table_alias): string
    {
        if (isset($this->allowed_join_tables[$table_alias])) {
            global $wpdb;
            // Return the full prefixed table name
            return $wpdb->prefix . $this->allowed_join_tables[$table_alias]['table'];
        }
        error_log("Attempted to join disallowed table alias: '{$table_alias}'.");
        return '';
    }
    // Updaters
    public function update($id, $data)
    {
        global $wpdb;
        try {
            $sanitized_data = $this->sanitizeData($data);
            $formatted_data = $this->formatData($data);
            return $wpdb->update($this->table_name, $sanitized_data, ['id' => $id], array_values($formatted_data), ['%d']);
        } catch (\Exception $e) {
            error_log("Error updating in " . $this->table_name . ": " . $e->getMessage());
            return false;
        }
    }
    public function updateWhere($where, $data)
    {
        global $wpdb;
        try {
            $sanitized_data = $this->sanitizeData($data);
            $data_formats = $this->formatData($data);

            $where_formats = [];
            foreach ($where as $key => $value) { // <-- FIX IS HERE: Use $key => $value
                if (is_int($value)) {
                    $where_formats[$key] = '%d'; // <-- Assign to $key
                } elseif (is_float($value)) {
                    $where_formats[$key] = '%f'; // <-- Assign to $key
                } else {
                    $where_formats[$key] = '%s'; // <-- Assign to $key
                }
            }

            // You might want to remove this if $data_formats is already generated by formatData()
            // And ensure $data_formats is also keyed by column name
            // $data_formats = $this->formatData($sanitized_data); // Ensure this returns associative array

            return $wpdb->update(
                $this->table_name,
                $sanitized_data, // Data to update
                $where,          // WHERE clause (associative array)
                $data_formats,   // Formats for $sanitized_data (associative array)
                $where_formats   // Formats for $where (associative array)
            );
        } catch (\Exception $e) {
            error_log("Error updating in " . $this->table_name . " with WHERE clause: " . $e->getMessage());
            return false;
        }
    }
    public function updateWhereWithHtml($where, $data)
    {
        global $wpdb;
        try {
            $sanitized_data = $this->sanitizeDataWithHtml($data);
            $data_formats = $this->formatData($data); // Formats for the data being updated

            $where_formats = [];
            foreach ($where as $value) {
                if (is_int($value)) {
                    $where_formats[] = '%d';
                } elseif (is_float($value)) {
                    $where_formats[] = '%f';
                } else {
                    $where_formats[] = '%s';
                }
            }

            return $wpdb->update(
                $this->table_name,
                $sanitized_data,
                $where,
                $data_formats,
                $where_formats
            );
        } catch (\Exception $e) {
            error_log("Error updating with HTML in " . $this->table_name . " with WHERE clause: " . $e->getMessage());
            return false;
        }
    }
    public function updateWithHtml($id, $data)
    {
        global $wpdb;
        try {
            $sanitized_data = $this->sanitizeDataWithHtml($data);
            $formatted_data = $this->formatData($data);
            return $wpdb->update($this->table_name, $sanitized_data, ['id' => $id], array_values($formatted_data), ['%d']);
        } catch (\Exception $e) {
            error_log("Error updating with HTML in " . $this->table_name . ": " . $e->getMessage());
            return false;
        }
    }
    // Creators
    public function create($data)
    {
        global $wpdb;
        try {
            $sanitized_data = $this->sanitizeData($data);
            $formatted_data = $this->formatData($data);
            $result = $wpdb->insert($this->table_name, $sanitized_data, array_values($formatted_data));
            if ($result) {
                return $wpdb->insert_id;
            }
            return false;
        } catch (\Exception $e) {
            error_log("Error creating in " . $this->table_name . ": " . $e->getMessage());
            return false;
        }
    }
    public function createFromArray(array $data_array)
    {
        global $wpdb; // Still need $wpdb for potential error logging, etc.
        $inserted_ids = [];

        // REMOVE: $wpdb->query('START TRANSACTION'); - The caller will handle the transaction

        try {
            foreach ($data_array as $data_item) {
                if (!is_array($data_item)) {
                    error_log("Invalid data item type provided to createFromArray. Skipping.");
                    continue;
                }

                $insert_id = $this->create($data_item);

                if ($insert_id !== false) {
                    $inserted_ids[] = $insert_id;
                } else {
                    // IMPORTANT: In this scenario, if a single insert fails,
                    // the caller's transaction will detect it if they check
                    // for the return value of this function.
                    // We *don't* rollback here, as the caller is managing the transaction.
                    error_log("Failed to insert one item in createFromArray. Caller's transaction will handle rollback if needed.");
                    // You might choose to return false here to signal failure to the caller
                    // so the caller can then decide to rollback its overall transaction.
                    return false;
                }
            }

            // REMOVE: $wpdb->query('COMMIT'); - The caller will handle the commit

            return $inserted_ids;

        } catch (\Exception $e) {
            // REMOVE: $wpdb->query('ROLLBACK'); - The caller will handle the rollback
            error_log("Exception in createFromArray for " . $this->table_name . ": " . $e->getMessage());
            // Signal failure to the caller
            return false;
        }
    }
    public function createWithHtml($data)
    {
        global $wpdb;
        try {
            $sanitized_data = $this->sanitizeDataWithHtml($data);
            $formatted_data = $this->formatData($data);
            $result = $wpdb->insert($this->table_name, $sanitized_data, array_values($formatted_data));
            if ($result) {
                return $wpdb->insert_id;
            }
            return false;
        } catch (\Exception $e) {
            error_log("Error creating with HTML in " . $this->table_name . ": " . $e->getMessage());
            return false;
        }
    }
    // Getters
    public function getTableName()
    {
        return $this->table_name;
    }
    public function getPaginated($page = 1, $per_page = 10, $where = [], $order_by = 'id', $order = 'ASC')
    {
        global $wpdb;
        try {
            $offset = ($page - 1) * $per_page;
            $where_clause = '';
            $where_values = [];
            if (!empty($where)) {
                foreach ($where as $key => $value) {
                    $where_clause .= ($where_clause ? ' AND ' : 'WHERE ') . $key . ' = %s';
                    $where_values[] = $value;
                }
            }

            $order_clause = "ORDER BY {$order_by} {$order}";

            $query = $wpdb->prepare(
                "SELECT * FROM {$this->table_name} {$where_clause} {$order_clause} LIMIT %d OFFSET %d",
                array_merge($where_values, [$per_page, $offset])
            );

            $results = $wpdb->get_results($query);

            $total_items = $this->countRows($where);
            $total_pages = ceil($total_items / $per_page);

            return [
                'items' => $results,
                'pagination' => [
                    'page' => (int) $page,
                    'per_page' => (int) $per_page,
                    'total_items' => (int) $total_items,
                    'total_pages' => (int) $total_pages,
                ],
            ];
        } catch (\Exception $e) {
            error_log("Error getting paginated data from " . $this->table_name . ": " . $e->getMessage());
            return false;
        }
    }
    public function getAll($order_params = ['order_by' => 'id', 'order' => 'ASC'])
    {
        global $wpdb;

        try {
            // --- Sanitize Order Parameters for ORDER BY clause ---
            $order_by_col = 'id'; // Default order by column
            $order_direction = 'ASC'; // Default order direction

            // Validate order_by
            if (isset($order_params['order_by']) && is_string($order_params['order_by'])) {
                $sanitized_order_by = $this->sanitizeColumnName(trim($order_params['order_by']));
                if (!empty($sanitized_order_by)) {
                    $order_by_col = $sanitized_order_by;
                }
            }

            // Validate order direction (whitelist is essential here)
            if (isset($order_params['order']) && is_string($order_params['order'])) {
                $upper_order = strtoupper(trim($order_params['order']));
                if (in_array($upper_order, ['ASC', 'DESC'])) {
                    $order_direction = $upper_order;
                }
            }

            // Construct the ORDER BY clause
            $order_by_clause = " ORDER BY {$order_by_col} {$order_direction}";

            // --- Construct and Execute the Query ---
            $sql = "SELECT * FROM {$this->table_name}{$order_by_clause}";

            return $wpdb->get_results($sql);

        } catch (\Exception $e) {
            error_log("Error getting all from " . $this->table_name . ": " . $e->getMessage());
            return false;
        }
    }

    public function getAllWithSelectedColumns($columns, $order_params = ['order_by' => 'id', 'order' => 'ASC'])
    {
        global $wpdb;
        try {
            // --- 1. Sanitize Columns for SELECT clause ---
            $select_columns = '*'; // Fallback to '*' if $columns input is invalid

            if (is_array($columns) && !empty($columns)) {
                $sanitized_cols = array_map([$this, 'sanitizeColumnName'], $columns);
                $sanitized_cols = array_filter($sanitized_cols); // Remove empty strings
                if (empty($sanitized_cols)) {
                    error_log("getAllWithSelectedColumns: No valid columns provided after sanitization for {$this->table_name}. Defaulting to '*'.");
                } else {
                    $select_columns = implode(', ', $sanitized_cols);
                }
            } elseif (is_string($columns) && !empty(trim($columns))) {
                if (trim($columns) === '*') {
                    $select_columns = '*';
                } else {
                    $sanitized_col = $this->sanitizeColumnName(trim($columns));
                    if (!empty($sanitized_col)) {
                        $select_columns = $sanitized_col;
                    } else {
                        error_log("getAllWithSelectedColumns: Invalid single column name provided after sanitization for {$this->table_name}. Defaulting to '*'.");
                    }
                }
            } else {
                error_log("getAllWithSelectedColumns: Invalid \$columns parameter type or empty for {$this->table_name}. Defaulting to '*'.");
            }

            // --- 2. Sanitize Order Parameters for ORDER BY clause ---
            $order_by_col = 'id'; // Default order by column
            $order_direction = 'ASC'; // Default order direction

            if (isset($order_params['order_by']) && is_string($order_params['order_by'])) {
                $sanitized_order_by = $this->sanitizeColumnName(trim($order_params['order_by']));
                if (!empty($sanitized_order_by)) {
                    $order_by_col = $sanitized_order_by;
                }
            }

            if (isset($order_params['order']) && is_string($order_params['order'])) {
                $upper_order = strtoupper(trim($order_params['order']));
                if (in_array($upper_order, ['ASC', 'DESC'])) {
                    $order_direction = $upper_order;
                }
            }

            $order_by_clause = " ORDER BY {$order_by_col} {$order_direction}";

            // --- 3. Construct and Execute the Query ---
            $sql = "SELECT {$select_columns} FROM {$this->table_name}{$order_by_clause}";

            return $wpdb->get_results($sql);

        } catch (\Exception $e) {
            error_log("Error getting all with selected columns from " . $this->table_name . ": " . $e->getMessage());
            return false;
        }
    }

    public function getById($id)
    {
        global $wpdb;
        try {
            return $wpdb->get_row($wpdb->prepare("SELECT * FROM {$this->table_name} WHERE id = %d", $id));
        } catch (\Exception $e) {
            error_log("Error getting " . $this->table_name . " by ID: " . $e->getMessage());
            return false;
        }
    }

    public function getByIds(array $ids, array $order_params = ['order_by' => 'id', 'order' => 'ASC'])
    {
        global $wpdb;
        try {
            // Ensure the array is not empty
            if (empty($ids)) {
                return [];
            }

            // Sanitize the IDs for use in the IN clause
            $sanitized_ids = array_map('absint', $ids);
            $ids_string = implode(',', $sanitized_ids);

            // Define allowed order_by columns to prevent SQL injection
            $allowed_order_by = ['id', 'name', 'date_created', 'date_modified']; // Add other allowed column names as needed
            $allowed_order = ['ASC', 'DESC'];

            // Sanitize and validate order_by and order parameters
            $order_by = isset($order_params['order_by']) && in_array($order_params['order_by'], $allowed_order_by)
                ? sanitize_key($order_params['order_by'])
                : 'name'; // Default if not valid

            $order = isset($order_params['order']) && in_array(strtoupper($order_params['order']), $allowed_order)
                ? strtoupper(sanitize_key($order_params['order']))
                : 'ASC'; // Default if not valid

            // Build the SQL query with ORDER BY clause
            $sql = "SELECT * FROM {$this->table_name} WHERE id IN ({$ids_string}) ORDER BY {$order_by} {$order}";

            return $wpdb->get_results($sql);
        } catch (\Exception $e) {
            error_log("Error getting " . $this->table_name . " by IDs: " . $e->getMessage());
            return false;
        }
    }
    public function getWhere($where)
    {
        global $wpdb;
        try {
            $where_clause = '';
            $where_values = [];
            foreach ($where as $key => $value) {
                $where_clause .= ($where_clause ? ' AND ' : 'WHERE ') . $key . ' = %s';
                $where_values[] = $value;
            }
            $query = $wpdb->prepare("SELECT * FROM {$this->table_name} " . $where_clause, $where_values);
            return $wpdb->get_results($query);
        } catch (\Exception $e) {
            error_log("Error getting from " . $this->table_name . " with WHERE clause: " . $e->getMessage());
            return false;
        }
    }
    public function getResultsWithCustomQueryAndOrder($sql_template, $sql_values = [], $order_params = [], $return_array_a = false)
    {
        global $wpdb;
        try {
            $default_order = ['order_by' => 'id', 'order' => 'ASC'];
            $order_params = array_merge($default_order, $order_params);

            $order_by = sanitize_key($order_params['order_by']);
            $order = strtoupper(sanitize_key($order_params['order']));

            if (!in_array($order, ['ASC', 'DESC'])) {
                $order = 'ASC';
            }

            // Append ORDER BY clause to the template
            $final_sql_template = $sql_template . " ORDER BY {$order_by} {$order}";

            // Prepare the query with the values
            $query = $wpdb->prepare($final_sql_template, ...$sql_values);

            // Determine return format
            $output_type = $return_array_a ? ARRAY_A : OBJECT;

            return $wpdb->get_results($query, $output_type);
        } catch (\Exception $e) {
            error_log("Error executing custom query with order: " . $e->getMessage());
            return false;
        }
    }
    public function getIdWhere($where)
    {
        global $wpdb; // Access the global WordPress database object

        try {
            $where_clause = '';
            $where_values = [];

            // Build the WHERE clause and collect values for preparation
            foreach ($where as $key => $value) {
                // Determine the correct placeholder based on value type.
                $placeholder = '%s'; // Default to string
                if (is_int($value)) {
                    $placeholder = '%d'; // Use integer placeholder
                } elseif (is_float($value)) {
                    $placeholder = '%f'; // Use float placeholder
                }

                $where_clause .= ($where_clause ? ' AND ' : 'WHERE ') . "`{$key}` = {$placeholder}";
                $where_values[] = $value;
            }

            // Construct the SQL query to select only the 'id' column.
            // We append "LIMIT 1" to ensure only one record is considered.
            $query = $wpdb->prepare(
                "SELECT `id` FROM {$this->table_name} " . $where_clause . " LIMIT 1",
                $where_values
            );

            // Execute the query and retrieve the 'id' value directly.
            // get_var() retrieves a single variable from the database.
            // It returns null if no results are found, or false on error.
            $result = $wpdb->get_var($query);

            // If the result is null (no record found), return false.
            // Otherwise, cast the result to an integer and return it.
            return $result !== null ? (int) $result : false;

        } catch (\Exception $e) {
            // Log any exceptions that occur during the database operation.
            error_log("Error getting ID from " . $this->table_name . " with WHERE clause: " . $e->getMessage());
            return false; // Return false to indicate an error
        }
    }
    public function getOneWhere($where)
    {
        global $wpdb; // Access the global WordPress database object

        try {
            $where_clause = '';
            $where_values = [];

            // Build the WHERE clause and collect values for preparation
            foreach ($where as $key => $value) {
                // Determine the correct placeholder based on value type.
                // Using backticks around column names to handle potential reserved words or special characters.
                $placeholder = '%s'; // Default to string
                if (is_int($value)) {
                    $placeholder = '%d'; // Use integer placeholder
                } elseif (is_float($value)) {
                    $placeholder = '%f'; // Use float placeholder
                }

                // Append 'AND' for subsequent conditions, 'WHERE' for the first
                $where_clause .= ($where_clause ? ' AND ' : 'WHERE ') . "`{$key}` = {$placeholder}";
                $where_values[] = $value;
            }

            // Construct the SQL query.
            // We append "LIMIT 1" to ensure only one record is fetched.
            $query = $wpdb->prepare(
                "SELECT * FROM {$this->table_name} " . $where_clause . " LIMIT 1",
                $where_values
            );

            // Execute the query and return a single row as an object.
            // get_row() returns a single row as an object, or null if no row is found.
            // It returns false on error.
            $result = $wpdb->get_row($query);

            // If the result is null (no record found), explicitly return false to match the error handling pattern.
            // Otherwise, return the found object.
            return $result !== null ? $result : false;

        } catch (\Exception $e) {
            // Log any exceptions that occur during the database operation.
            error_log("Error getting single row from " . $this->table_name . " with WHERE clause: " . $e->getMessage());
            return false; // Return false to indicate an error
        }
    }

    public function getPaginatedWith(
        $page = 1,
        $per_page = 10,
        $columns, // Made mandatory as it's crucial with joins
        $where = [],
        $join_params = [],
        $order_params = ['order_by' => 'id', 'order' => 'ASC']
    ) {
        global $wpdb;
        try {
            // Ensure $columns is not empty, otherwise default or return error
            if (empty($columns)) {
                error_log("getPaginatedWith: 'columns' parameter cannot be empty.");
                return new WP_Error('validation_error', 'Columns must be specified for getPaginatedWith.', ['status' => 400]);
            }
            $offset = ($page - 1) * $per_page;

            // --- 1. Sanitize Columns for SELECT clause ---
            $select_columns = ''; // Should be explicitly built from input
            if (is_array($columns)) {
                $sanitized_cols = array_map([$this, 'sanitizeColumnName'], $columns);
                $sanitized_cols = array_filter($sanitized_cols);
                if (empty($sanitized_cols)) {
                    error_log("getPaginatedWith: No valid columns provided after sanitization. Cannot build query.");
                    return false; // Or throw specific error
                }
                $select_columns = implode(', ', $sanitized_cols);
            } elseif (is_string($columns) && trim($columns) === '*') {
                $select_columns = '*';
            } elseif (is_string($columns) && !empty(trim($columns))) {
                $sanitized_col = $this->sanitizeColumnName(trim($columns));
                if (empty($sanitized_col)) {
                    error_log("getPaginatedWith: Invalid single column name provided after sanitization. Cannot build query.");
                    return false; // Or throw specific error
                }
                $select_columns = $sanitized_col;
            } else {
                error_log("getPaginatedWith: Invalid \$columns parameter type or empty.");
                return false; // Or throw specific error
            }

            // --- 2. Build Join Clause ---
            $join_clause = '';
            if (!empty($join_params)) {
                foreach ($join_params as $alias => $params) {
                    $join_type = isset($params['type']) && in_array(strtoupper($params['type']), $this->allowed_join_types)
                        ? strtoupper($params['type']) : 'INNER JOIN';
                    $join_table = $this->sanitizeJoinTable($alias); // Get the full prefixed table name
                    $on_condition = isset($params['on']) ? $params['on'] : ''; // e.g. 'main.id = other.main_id'

                    if (empty($join_table) || empty($on_condition)) {
                        error_log("getPaginatedWith: Invalid join parameters for alias '{$alias}'. Skipping.");
                        continue;
                    }

                    // VERY IMPORTANT: Sanitize columns in ON condition.
                    // This is a simplified regex that allows basic alphanumeric, _, =, ., (, ), and spaces.
                    // For more complex ON conditions, you might need a more robust parser or pre-defined ON conditions.
                    // A proper implementation would parse and sanitize each column/table reference.
                    $sanitized_on_condition = preg_replace('/[^a-zA-Z0-9_=\.\s()]/', '', $on_condition);

                    if (!empty($sanitized_on_condition)) {
                        $join_clause .= " {$join_type} {$join_table} AS {$alias} ON {$sanitized_on_condition}";
                    }
                }
            }


            // --- 3. Build Where Clause ---
            $where_clause = '';
            $where_values = [];
            if (!empty($where)) {
                $conditions = [];
                foreach ($where as $key => $value) {
                    // Sanitize the column key, which can be 'column_name' or 'table_alias.column_name'
                    $sanitized_key = $this->sanitizeColumnName($key);
                    if (empty($sanitized_key)) {
                        error_log("getPaginatedWith: Invalid WHERE column key '{$key}'. Skipping.");
                        continue;
                    }
                    $conditions[] = "{$sanitized_key} = %s"; // %s for string, %d for integer
                    $where_values[] = $value;
                }
                if (!empty($conditions)) {
                    $where_clause = 'WHERE ' . implode(' AND ', $conditions);
                }
            }

            // --- 4. Sanitize Order Parameters ---
            $order_by_col = 'id';
            $order_direction = 'ASC';

            if (isset($order_params['order_by']) && is_string($order_params['order_by'])) {
                // order_by can be 'table_alias.column_name'
                $sanitized_order_by = $this->sanitizeColumnName(trim($order_params['order_by']));
                if (!empty($sanitized_order_by)) {
                    $order_by_col = $sanitized_order_by;
                }
            }

            if (isset($order_params['order']) && is_string($order_params['order'])) {
                $upper_order = strtoupper(trim($order_params['order']));
                if (in_array($upper_order, ['ASC', 'DESC'])) {
                    $order_direction = $upper_order;
                }
            }
            $order_clause = "ORDER BY {$order_by_col} {$order_direction}";


            // --- 5. Construct Final Query ---
            $query = $wpdb->prepare(
                "SELECT {$select_columns} FROM {$this->table_name} {$join_clause} {$where_clause} {$order_clause} LIMIT %d OFFSET %d",
                array_merge($where_values, [$per_page, $offset])
            );

            $results = $wpdb->get_results($query);

            // --- 6. Get Total Items (needs to use the same WHERE and JOIN clauses) ---
            $total_items = $this->countRows($where, $join_params); // Pass join_params to countRows
            $total_pages = ceil($total_items / $per_page);

            return [
                'items' => $results,
                'pagination' => [
                    'page' => (int) $page,
                    'per_page' => (int) $per_page,
                    'total_items' => (int) $total_items,
                    'total_pages' => (int) $total_pages,
                ],
            ];
        } catch (\Exception $e) {
            error_log("Error getting paginated data with joins from " . $this->table_name . ": " . $e->getMessage());
            return false;
        }
    }
    // Deleters
    public function delete($id)
    {
        global $wpdb;
        try {
            return $wpdb->delete($this->table_name, ['id' => $id], ['%d']);
        } catch (\Exception $e) {
            error_log("Error deleting from " . $this->table_name . ": " . $e->getMessage());
            return false;
        }
    }
    public function deleteAll()
    {
        global $wpdb;
        try {
            // Use DELETE FROM instead of TRUNCATE TABLE to respect transactions
            $result = $wpdb->query("DELETE FROM {$this->table_name}");

            // For DELETE, $result returns the number of affected rows, or false on error.
            // So, checking for false is still correct for an error.
            if ($result === false) {
                return false; // Query failed to execute
            }
            // If 0 rows were deleted, it still means the operation succeeded but the table was already empty.
            return true; // Operation succeeded
        } catch (\Exception $e) {
            error_log("Error deleting all from " . $this->table_name . ": " . $e->getMessage());
            return false;
        }
    }
    public function deleteWhere($where)
    {
        global $wpdb;
        try {
            $where_clause = '';
            $where_values = [];
            foreach ($where as $key => $value) {
                $where_clause .= ($where_clause ? ' AND ' : 'WHERE ') . $key . ' = %s';
                $where_values[] = $value;
            }

            $query = $wpdb->prepare("DELETE FROM {$this->table_name} " . $where_clause, $where_values);
            $result = $wpdb->query($query);

            if ($result === false) {
                return false;
            }

            return true;
        } catch (\Exception $e) {
            error_log("Error deleting from " . $this->table_name . " with WHERE clause: " . $e->getMessage());
            return false;
        }
    }
    // Utils
    public function countWhere($where)
    {
        global $wpdb;
        try {
            $where_clause = '';
            $where_values = [];
            foreach ($where as $key => $value) {
                $where_clause .= ($where_clause ? ' AND ' : 'WHERE ') . $key . ' = %s';
                $where_values[] = $value;
            }
            $query = $wpdb->prepare("SELECT COUNT(*) FROM {$this->table_name} " . $where_clause, $where_values);
            return (int) $wpdb->get_var($query);
        } catch (\Exception $e) {
            error_log("Error counting from " . $this->table_name . " with WHERE clause: " . $e->getMessage());
            return false;
        }
    }
    public function countRows(array $where = [], array $join_params = [])
    {
        global $wpdb;

        $where_clause = '';
        $where_values = [];
        if (!empty($where)) {
            $conditions = [];
            foreach ($where as $key => $value) {
                // Assuming $key can be 'column_name' or 'table_alias.column_name'
                $sanitized_key = $this->sanitizeColumnName($key);
                if (empty($sanitized_key)) {
                    error_log("countRows: Invalid WHERE column key '{$key}'. Skipping.");
                    continue;
                }
                $conditions[] = "{$sanitized_key} = %s";
                $where_values[] = $value;
            }
            if (!empty($conditions)) {
                $where_clause = 'WHERE ' . implode(' AND ', $conditions);
            }
        }

        $join_clause = '';
        if (!empty($join_params)) {
            foreach ($join_params as $alias => $params) {
                $join_type = isset($params['type']) && in_array(strtoupper($params['type']), $this->allowed_join_types)
                    ? strtoupper($params['type']) : 'INNER JOIN';
                $join_table = $this->sanitizeJoinTable($alias); // Get the full table name
                $on_condition = isset($params['on']) ? $params['on'] : ''; // e.g. 'main.id = other.main_id'

                if (empty($join_table) || empty($on_condition)) {
                    error_log("countRows: Invalid join parameters for alias '{$alias}'. Skipping.");
                    continue;
                }

                // Sanitize columns in ON condition (very important for security)
                // This is a simplified regex; for complex ON clauses, you'd need more sophisticated parsing/whitelisting
                $sanitized_on_condition = preg_replace('/[^a-zA-Z0-9_=\.\s()]/', '', $on_condition);
                // Further validation or pre-defined allowed ON clauses would be ideal.
                // For example, if you know joins are always on 'main.id = join.main_id', you can hardcode/validate more strictly.

                if (!empty($sanitized_on_condition)) {
                    $join_clause .= " {$join_type} {$join_table} AS {$alias} ON {$sanitized_on_condition}";
                }
            }
        }
        // The COUNT(*) query needs to include the joins but not LIMIT/OFFSET
        $query = "SELECT COUNT({$this->table_name}.id) FROM {$this->table_name} {$join_clause} {$where_clause}";
        // No need for wpdb->prepare for the main table name or join clause as they're sanitized/hardcoded.
        // Where values are prepared by the string itself.
        $total_items = $wpdb->get_var($wpdb->prepare($query, $where_values));

        return (int) $total_items;
    }
    public function exists($where)
    {
        global $wpdb;
        try {
            $where_clause = '';
            $where_values = [];
            foreach ($where as $key => $value) {
                $where_clause .= ($where_clause ? ' AND ' : 'WHERE ') . $key . ' = %s';
                $where_values[] = $value;
            }
            $query = $wpdb->prepare("SELECT COUNT(*) FROM {$this->table_name} " . $where_clause, $where_values);
            return (bool) $wpdb->get_var($query);
        } catch (\Exception $e) {
            error_log("Error checking existence in " . $this->table_name . ": " . $e->getMessage());
            return false;
        }
    }
}