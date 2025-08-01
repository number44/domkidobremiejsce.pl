// components/SchemaPreview.tsx
import React, { FC, CSSProperties } from "react";
import { PageSchemaDataI } from "../types";

interface SchemaPreviewProps {
  schemaData: PageSchemaDataI | null;
  title?: string;
}

const SchemaPreview: FC<SchemaPreviewProps> = ({ schemaData, title = "Schema.org JSON-LD Preview" }) => {
  const containerStyle: CSSProperties = {
    fontFamily: "Arial, sans-serif",
    padding: "25px",
    backgroundColor: "#eaf4ff",
    border: "1px solid #a3d4ff",
    borderRadius: "10px",
    margin: "20px 0",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    color: "#333",
  };

  const titleStyle: CSSProperties = {
    color: "#0056b3",
    marginBottom: "15px",
    borderBottom: "2px solid #b3e0ff",
    paddingBottom: "10px",
    fontSize: "1.5em",
  };

  const sectionTitleStyle: CSSProperties = {
    color: "#0056b3",
    marginTop: "20px",
    marginBottom: "10px",
    fontSize: "1.2em",
    borderBottom: "1px dotted #cceeff",
    paddingBottom: "5px",
  };

  const detailStyle: CSSProperties = {
    marginBottom: "8px",
    fontSize: "0.95em",
    lineHeight: "1.4",
  };

  const labelStyle: CSSProperties = {
    fontWeight: "bold",
    marginRight: "8px",
    color: "#003366",
  };

  const codeBlockStyle: CSSProperties = {
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "5px",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    fontSize: "0.85em",
    color: "#333",
  };

  const googleSnippetExampleStyle: CSSProperties = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "15px",
    marginTop: "25px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
    fontFamily: "Google Sans, Roboto, sans-serif",
  };

  const googleTitleStyle: CSSProperties = {
    color: "#1a0dab",
    fontSize: "1.2em",
    marginBottom: "3px",
    cursor: "pointer",
  };

  const googleUrlStyle: CSSProperties = {
    color: "#006621",
    fontSize: "0.8em",
    marginBottom: "5px",
  };

  const googleDescriptionStyle: CSSProperties = {
    color: "#4d5156",
    fontSize: "0.9em",
    lineHeight: "1.4",
  };

  const googleStarStyle: CSSProperties = {
    color: "#fbbc05",
    fontSize: "0.9em",
    marginRight: "5px",
  };

  const renderStars = (rating: string) => {
    const value = parseFloat(rating);
    if (isNaN(value) || value < 0 || value > 5) return null;
    const fullStars = Math.floor(value);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`star-${i}`} style={googleStarStyle}>
          &#9733;
        </span>,
      );
    }
    const hasHalfStar = value % 1 >= 0.5;
    if (hasHalfStar) {
      stars.push(
        <span key="half-star" style={googleStarStyle}>
          &#9734;
        </span>,
      );
    }
    return stars;
  };

  if (!schemaData) {
    return (
      <div style={containerStyle}>
        <h3 style={titleStyle}>{title}</h3>
        <p>No Schema.org data to display.</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>{title}</h3>

      <p style={detailStyle}>
        <span style={labelStyle}>@context:</span> {schemaData["@context"]}
      </p>
      <p style={detailStyle}>
        <span style={labelStyle}>@type:</span> {schemaData["@type"]}
      </p>
      <p style={detailStyle}>
        <span style={labelStyle}>Name:</span> {schemaData.name}
      </p>
      <p style={detailStyle}>
        <span style={labelStyle}>URL:</span>{" "}
        <a href={schemaData.url} target="_blank" rel="noopener noreferrer">
          {schemaData.url}
        </a>
      </p>
      <p style={detailStyle}>
        <span style={labelStyle}>Description:</span> {schemaData.description}
      </p>

      {schemaData.aggregateRating && (
        <>
          <h4 style={sectionTitleStyle}>Aggregate Rating:</h4>
          <p style={detailStyle}>
            <span style={labelStyle}>Rating Value:</span> {schemaData.aggregateRating.ratingValue}
          </p>
          <p style={detailStyle}>
            <span style={labelStyle}>Review Count:</span> {schemaData.aggregateRating.reviewCount}
          </p>
        </>
      )}

      {schemaData.address && (
        <>
          <h4 style={sectionTitleStyle}>Address:</h4>
          <p style={detailStyle}>
            <span style={labelStyle}>Street:</span> {schemaData.address.streetAddress}
          </p>
          <p style={detailStyle}>
            <span style={labelStyle}>Locality:</span> {schemaData.address.addressLocality}
          </p>
          <p style={detailStyle}>
            <span style={labelStyle}>Region:</span> {schemaData.address.addressRegion}
          </p>
          <p style={detailStyle}>
            <span style={labelStyle}>Postal Code:</span> {schemaData.address.postalCode}
          </p>
          <p style={detailStyle}>
            <span style={labelStyle}>Country:</span> {schemaData.address.addressCountry}
          </p>
        </>
      )}

      {schemaData.telephone && (
        <p style={detailStyle}>
          <span style={labelStyle}>Telephone:</span> {schemaData.telephone}
        </p>
      )}

      <h4 style={sectionTitleStyle}>Raw JSON-LD Output:</h4>
      <pre style={codeBlockStyle}>{JSON.stringify(schemaData, null, 2)}</pre>

      <h4 style={sectionTitleStyle}>Simulated Google Rich Snippet (Approximate):</h4>
      <div style={googleSnippetExampleStyle}>
        <div style={googleTitleStyle}>{schemaData.name}</div>
        <div style={googleUrlStyle}>
          {new URL(schemaData.url).hostname}
          {new URL(schemaData.url).pathname}
        </div>
        {schemaData.aggregateRating && (
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            {renderStars(schemaData.aggregateRating.ratingValue)}
            <span style={googleDescriptionStyle}>
              {schemaData.aggregateRating.ratingValue} out of 5 - Based on {schemaData.aggregateRating.reviewCount}{" "}
              reviews
            </span>
          </div>
        )}
        <div style={googleDescriptionStyle}>
          {schemaData.description}
          {schemaData.address && ` ${schemaData.address.addressLocality}, ${schemaData.address.addressRegion}`}
        </div>
      </div>
      <p style={{ fontSize: "0.8em", color: "#666", marginTop: "10px" }}>
        This is a *simulated* preview based on common rich result layouts.
        <br />
        Actual display in Google Search results may vary.
        <br />
        Always use{" "}
        <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer">
          Google's Rich Results Test
        </a>{" "}
        for accurate validation.
      </p>
    </div>
  );
};

export default SchemaPreview;
