// components/MetaPreview.tsx
import React, { FC, CSSProperties } from "react";
import { ResponseMetaI } from "../types"; // Adjust path as needed

interface MetaPreviewProps {
  metaData: ResponseMetaI | null; // Now accepts a single object or null
  title?: string;
}

const MetaPreview: FC<MetaPreviewProps> = ({ metaData, title = "Metadata Preview" }) => {
  const containerStyle: CSSProperties = {
    fontFamily: "sans-serif",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    borderRadius: "8px",
    margin: "20px 0",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };

  const itemStyle: CSSProperties = {
    backgroundColor: "#fff",
    border: "1px solid #eee",
    borderRadius: "5px",
    padding: "15px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  };

  const titleStyle: CSSProperties = {
    color: "#333",
    marginBottom: "15px",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
  };

  const detailStyle: CSSProperties = {
    marginBottom: "5px",
    fontSize: "0.9em",
    color: "#555",
  };

  const labelStyle: CSSProperties = {
    fontWeight: "bold",
    marginRight: "5px",
    color: "#333",
  };

  if (!metaData) {
    // Check if metaData is null
    return (
      <div style={containerStyle}>
        <h3 style={titleStyle}>{title}</h3>
        <p>No metadata to display.</p>
      </div>
    );
  }

  // If metaData exists, render its properties directly
  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>{title}</h3>
      <div style={itemStyle}>
        <h4>
          Post ID: {metaData.post_id} (ID: {metaData.id})
        </h4>
        <p style={detailStyle}>
          <span style={labelStyle}>Schema Type:</span> {metaData.schema_type}
        </p>
        <p style={detailStyle}>
          <span style={labelStyle}>Google Rating:</span> {metaData.google_rating || "N/A"}
        </p>
        <p style={detailStyle}>
          <span style={labelStyle}>Google Review Count:</span> {metaData.google_review_count || "0"}
        </p>
        <p style={detailStyle}>
          <span style={labelStyle}>Address:</span> {metaData.street_address}, {metaData.address_locality},{" "}
          {metaData.address_region} {metaData.postal_code}, {metaData.address_country}
        </p>
        <p style={detailStyle}>
          <span style={labelStyle}>Telephone:</span> {metaData.telephone || "N/A"}
        </p>
        <p style={detailStyle}>
          <span style={labelStyle}>Description:</span> {metaData.custom_description || "N/A"}
        </p>
        <p style={detailStyle}>
          <span style={labelStyle}>Last Updated:</span> {metaData.last_updated}
        </p>
        <p style={detailStyle}>
          <span style={labelStyle}>Created At:</span> {metaData.created_at}
        </p>
      </div>
    </div>
  );
};

export default MetaPreview;
