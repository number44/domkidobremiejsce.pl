import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { Button, TextControl, TextareaControl } from "@wordpress/components"; // Import necessary WordPress components
import { getHeaders } from "../helpers/http";
import { ResponseMetaI } from "../types";
import MetaPreview from "./MetaPreview";
import MySchemaGeneratorPanel from "./MySchemeGeneratorPanel";

interface PropsI {}

interface MetaData {
  post_id: number;
  schema_type: string;
  google_rating: number;
  google_review_count: number;
  street_address: string;
  address_locality: string;
  address_region: string;
  postal_code: string;
  address_country: string;
  telephone: string;
  custom_description: string;
}

const MetaForm = ({}: PropsI) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRecord, setIsRecord] = useState(false);
  const [postId, setPostId] = useState<number>(0);
  const [schemaType, setSchemaType] = useState<string>("WebPage");
  const [googleRating, setGoogleRating] = useState<number>(0);
  const [googleReviewCount, setGoogleReviewCount] = useState<number>(0);
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [addressLocality, setAddressLocality] = useState<string>("");
  const [addressRegion, setAddressRegion] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [addressCountry, setAddressCountry] = useState<string>("PL");
  const [telephone, setTelephone] = useState<string>("");
  const [customDescription, setCustomDescription] = useState<string>("");
  const [metaData, setMetaData] = useState<ResponseMetaI | null>(null);

  const fetchSingleData = async (id: number) => {
    try {
      const response = await fetch(wpApiSettings.api_url + `metadata/${wpApiSettings.post_id}`, {
        headers: getHeaders(),
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const respJson = await response.json();
      if (respJson.data && respJson.data.isRecord) {
        setIsRecord(true);
        // Populate form fields if a record exists
      } else {
        setIsRecord(false);
      }

      const metadata: ResponseMetaI | null = respJson.data.metadata;
      setMetaData(metadata);
      if (metadata) {
        setSchemaType(metadata.schema_type);
        setGoogleRating(+metadata.google_rating);
        setGoogleReviewCount(+metadata.google_review_count);
        setStreetAddress(metadata.street_address);
        setAddressLocality(metadata.address_locality);
        setAddressRegion(metadata.address_region);
        setPostalCode(metadata.postal_code);
        setAddressCountry(metadata.address_country);
        setTelephone(metadata.telephone);
        setCustomDescription(metadata.custom_description);
        setPostId(+metadata.post_id);
      }
    } catch (error) {
      console.error("Error fetching single metadata:", error);
      setIsRecord(false); // Assume no record if there's an error
    } finally {
      setIsLoading(false);
    }
  };

  const createMetaData = async () => {
    setIsLoading(true);
    const metaData: MetaData = {
      post_id: wpApiSettings.post_id, // You'll likely want to get this dynamically, e.g., from the current post ID in WordPress
      schema_type: schemaType,
      google_rating: googleRating,
      google_review_count: googleReviewCount,
      street_address: streetAddress,
      address_locality: addressLocality,
      address_region: addressRegion,
      postal_code: postalCode,
      address_country: addressCountry,
      telephone: telephone,
      custom_description: customDescription,
    };

    try {
      const response = await fetch(wpApiSettings.api_url + "metadata", {
        headers: {
          ...getHeaders(),
          "Content-Type": "application/json", // Specify content type for POST requests
        },
        method: "POST",
        body: JSON.stringify(metaData), // Send the data as JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const respJson = await response.json();
      alert(respJson.message || "Metadata saved successfully!");
      setIsRecord(true); // Assuming successful creation/update means a record now exists
      // Optionally re-fetch data to confirm
      // fetchSingleData(postId); // If postId is the primary identifier for fetching
    } catch (error: any) {
      console.error("Error creating/updating metadata:", error.message);
      alert(`Error saving metadata: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMetaData = async () => {
    setIsLoading(true);
    const metaData: MetaData = {
      post_id: wpApiSettings.post_id, // You'll likely want to get this dynamically, e.g., from the current post ID in WordPress
      schema_type: schemaType,
      google_rating: googleRating,
      google_review_count: googleReviewCount,
      street_address: streetAddress,
      address_locality: addressLocality,
      address_region: addressRegion,
      postal_code: postalCode,
      address_country: addressCountry,
      telephone: telephone,
      custom_description: customDescription,
    };
    const url = wpApiSettings.api_url + "metadata/" + postId + "/";
    try {
      const response = await fetch(wpApiSettings.api_url + "metadata/" + postId + "/", {
        headers: {
          ...getHeaders(),
        },
        method: "PUT",
        body: JSON.stringify(metaData), // Send the data as JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const respJson = await response.json();
      alert(respJson.message || "Metadata saved successfully!");
      setIsRecord(true); // Assuming successful creation/update means a record now exists
      // Optionally re-fetch data to confirm
      // fetchSingleData(postId); // If postId is the primary identifier for fetching
    } catch (error: any) {
      console.error("Error creating/updating metadata:", error.message);
      alert(`Error saving metadata: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAggregateRating = () => {
    setGoogleRating(0);
    setGoogleReviewCount(0);
  };
  useEffect(() => {
    // In a real WordPress environment, you'd get the current post ID here.
    // For demonstration, let's assume post_id 1. You'll need to adjust this.
    // Example: const currentPostId = wp.data.select('core/editor').getCurrentPostId();
    const currentPostId = 1; // Placeholder: Replace with actual post ID
    setPostId(currentPostId);
    if (currentPostId) {
      fetchSingleData(currentPostId);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div style={styles.loading}>Loading metadata...</div>;
  }
  return (
    <div style={styles.container}>
      <h2>{isRecord ? "Edit Metadata" : "Create Metadata"}</h2>
      {wpApiSettings.post ? (
        <MySchemaGeneratorPanel
          metaData={metaData}
          currentPostTitle={wpApiSettings.post.post_title}
          currentPostUrl={"http://localhost/"}
          currentPostExcerpt={wpApiSettings.post.post_excerpt}
        />
      ) : (
        <h1>Musisz być na stronie lub poscie</h1>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          isRecord ? updateMetaData() : createMetaData();
        }}
      >
        <TextControl
          label="Schema Type"
          value={schemaType}
          onChange={setSchemaType}
          help="e.g., WebPage, LocalBusiness, Article"
        />
        <TextControl
          label="Google Rating"
          value={googleRating}
          onChange={(value) => setGoogleRating(parseFloat(value))}
          help="e.g., 4.5"
        />
        <TextControl
          label="Google Review Count"
          value={String(googleReviewCount)}
          onChange={(val) => setGoogleReviewCount(parseInt(val) || 0)}
          type="number"
        />
        <TextControl label="Street Address" value={streetAddress} onChange={setStreetAddress} />
        <TextControl label="Address Locality (City)" value={addressLocality} onChange={setAddressLocality} />
        <TextControl label="Address Region (State/Province)" value={addressRegion} onChange={setAddressRegion} />
        <TextControl label="Postal Code" value={postalCode} onChange={setPostalCode} />
        <TextControl
          label="Address Country (2-letter code)"
          value={addressCountry}
          onChange={setAddressCountry}
          maxLength={2}
        />
        <TextControl label="Telephone" value={telephone} onChange={setTelephone} />
        <TextareaControl
          label="Custom Description"
          value={customDescription}
          onChange={setCustomDescription}
          rows={5}
        />
        <Button onClick={() => (isRecord ? updateMetaData() : createMetaData())} variant="primary" isBusy={isLoading}>
          {isRecord ? "Update Metadata" : "Create Metadata"}
        </Button>
      </form>
    </div>
  );
};

export default MetaForm;

const styles: { [key: string]: CSSProperties } = {
  container: {
    padding: "20px",
    margin: "0 auto",
    borderRadius: "5px",
  },
  loading: {
    padding: "20px",
    textAlign: "center",
    fontSize: "1.2em",
    color: "#555",
  },
};
