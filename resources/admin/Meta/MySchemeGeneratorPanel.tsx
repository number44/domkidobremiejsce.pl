// components/MySchemaGeneratorPanel.tsx
import React, { FC, useEffect, useState } from "react";
import { ToggleControl, RadioControl, Panel, PanelBody } from "@wordpress/components";
import SchemaPreview from "./SchemaPreview";
import { PageSchemaDataI, ResponseMetaI } from "../types";

interface MySchemaGeneratorPanelProps {
  metaData: ResponseMetaI | null;
  currentPostTitle: string;
  currentPostUrl: string;
  currentPostExcerpt: string;
}

const MySchemaGeneratorPanel: FC<MySchemaGeneratorPanelProps> = ({
  metaData,
  currentPostTitle,
  currentPostUrl,
  currentPostExcerpt,
}) => {
  const [generatedSchema, setGeneratedSchema] = useState<PageSchemaDataI | null>(null);

  // State for user controls
  const [showAggregateRating, setShowAggregateRating] = useState(
    metaData?.google_rating && metaData?.google_review_count > 0 ? true : false,
  );
  const [schemaType, setSchemaType] = useState(metaData?.schema_type || "WebPage");

  // We need to re-sync our controls with incoming props if metaData changes from outside
  useEffect(() => {
    if (metaData) {
      setShowAggregateRating(metaData.google_rating && metaData.google_review_count > 0 ? true : false);
      setSchemaType(metaData.schema_type);
    } else {
      // Reset to defaults if no metadata is present
      setShowAggregateRating(false);
      setSchemaType("WebPage");
    }
  }, [metaData]);

  useEffect(() => {
    // This logic now uses the state variables for the controls
    const generateSchema = () => {
      // Use either the custom description or the post excerpt as a fallback
      const description = metaData?.custom_description || currentPostExcerpt || "A general description for this page.";

      let schema: PageSchemaDataI = {
        "@context": "https://schema.org",
        "@type": schemaType, // Use the schema type from state
        name: currentPostTitle,
        url: currentPostUrl,
        description: description,
      };

      // Only include rating if the user toggles it ON and data exists
      if (showAggregateRating && metaData?.google_rating && metaData?.google_review_count > 0) {
        schema.aggregateRating = {
          "@type": "AggregateRating",
          ratingValue: metaData.google_rating,
          reviewCount: String(metaData.google_review_count),
        };
      }

      // Only include address/telephone if schema type is LocalBusiness AND fields are populated
      if (
        schemaType === "LocalBusiness" &&
        metaData?.street_address &&
        metaData?.address_locality &&
        metaData?.address_region &&
        metaData?.postal_code &&
        metaData?.address_country
      ) {
        schema.address = {
          "@type": "PostalAddress",
          streetAddress: metaData.street_address,
          addressLocality: metaData.address_locality,
          addressRegion: metaData.address_region,
          postalCode: metaData.postal_code,
          addressCountry: metaData.address_country,
        };
        if (metaData.telephone) {
          schema.telephone = metaData.telephone;
        }
      }

      setGeneratedSchema(schema);
    };

    generateSchema();
  }, [metaData, currentPostTitle, currentPostUrl, currentPostExcerpt, showAggregateRating, schemaType]); // Re-run effect when any of these dependencies change

  return (
    <div style={{ padding: "20px" }}>
      <h2>Schema.org Generator & Preview</h2>

      <p style={{ fontSize: "0.9em", marginBottom: "20px" }}>
        This preview shows the schema generated from the metadata for this page.
      </p>

      <Panel>
        <PanelBody title="Schema Controls" initialOpen={true}>
          <div className="grid-1 gap-2">
            <RadioControl
              label="Select Schema Type"
              selected={schemaType}
              options={[
                { label: "WebPage (Default)", value: "WebPage" },
                { label: "LocalBusiness", value: "LocalBusiness" },
                { label: "Article", value: "Article" },
              ]}
              onChange={(option) => setSchemaType(option)}
            />

            <ToggleControl
              label="Show Aggregate Rating"
              help="Include Google rating and review count in the schema."
              checked={showAggregateRating}
              onChange={setShowAggregateRating}
              // Disable if there's no data to show
              disabled={!metaData || !(metaData.google_rating && metaData.google_review_count > 0)}
            />
          </div>
        </PanelBody>
      </Panel>

      {metaData && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "5px",
            backgroundColor: "#fdfdfd",
          }}
        >
          <strong>Source Data from MetaTable:</strong>
          <ul>
            <li>
              <strong>Schema Type (from DB):</strong> {metaData.schema_type}
            </li>
            <li>
              <strong>Google Rating:</strong> {metaData.google_rating} ({metaData.google_review_count} reviews)
            </li>
            <li>
              <strong>Address:</strong> {metaData.street_address}, {metaData.address_locality}, ...
            </li>
            <li>
              <strong>Custom Description:</strong> {metaData.custom_description || "N/A"}
            </li>
          </ul>
        </div>
      )}

      <SchemaPreview schemaData={generatedSchema} />
    </div>
  );
};

export default MySchemaGeneratorPanel;
