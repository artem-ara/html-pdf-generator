# PDF Generator API Documentation

This document outlines the API endpoints available for generating PDF presentations and screenshots from HTML templates.

## Base URL

All API endpoints are relative to the base URL of your server:

```
http://localhost:3000
```

## Available Endpoints

### 1. Get Available Templates

Retrieves a list of all available templates that can be used for PDF generation.

**Endpoint:** `GET /api/templates`

**Response:**

```json
{
  "success": true,
  "templates": [
    { "id": "page1", "name": "Page 1" },
    { "id": "page2", "name": "Page 2" },
    { "id": "page3", "name": "Page 3" }
  ]
}
```

### 2. Generate PDF

Generates a PDF document based on the provided data and selected templates.

**Endpoint:** `POST /api/generate-pdf`

**Request Body:**

```json
{
  "propertyName": "ELO 2 Damac Hills",
  "presentationText": "Presentation prepared by Luxury Real Estate",
  "lookText": "Look what we find for you",
  "creationDate": "Date of creation 22.04.2025",
  "agentName": "Svetlana Frolova",
  "agentTitle": "Luxury Real Estate",
  "agentPhone": "+971 50 355 44 22",
  "agentEmail": "s.frolova@fiduproperties.ae",
  "agentWebsite": "fiduproperties.ae",
  "pages": ["page1", "page2", "page3"]
}
```

**Notes:**
- `propertyName` is required
- `pages` is optional - if not provided, all available templates will be used
- All other fields are optional but recommended for a complete presentation

**Response:**
- Content-Type: application/pdf
- The PDF file as a binary download

### 3. Generate Screenshots

Generates screenshots of each page based on the provided data.

**Endpoint:** `POST /api/generate-screenshot`

**Request Body:**
Same as the PDF endpoint.

**Response:**

```json
{
  "success": true,
  "screenshots": [
    {
      "page": "page1",
      "data": "data:image/png;base64,..."
    },
    {
      "page": "page2",
      "data": "data:image/png;base64,..."
    }
  ]
}
```

## Field Mappings

The server supports automatic detection and replacement of placeholders in templates. Here's a list of all available fields that can be provided:

| Field Key | Description |
|-----------|-------------|
| propertyName | Name of the property |
| backgroundUpload | Main background image (base64 or URL) |
| companyLogoUpload | Company logo (base64 or URL) |
| avatarUpload | Agent avatar image (base64 or URL) |
| presentationText | Text shown in the presentation header |
| lookText | Subheading text |
| creationDate | Date when the presentation was created |
| agentName | Name of the real estate agent |
| agentTitle | Job title of the agent |
| agentPhone | Phone number of the agent |
| agentEmail | Email address of the agent |
| agentWebsite | Website URL of the agent |
| developerLogo | Logo of the developer (base64 or URL) |
| developerName | Name of the developer |
| districtName | District/area name |
| timelineStartDate | Project start date |
| timelineEndDate | Project completion/handover date |
| timelineProgressText | Text describing current progress |
| projectImageP2 | Project image for page 2 (base64 or URL) |
| buildingImageP3 | Building image for page 3 (base64 or URL) |
| descriptionText | Project description text |
| unitStudioCount | Number of studio units |
| unit1BedCount | Number of 1-bedroom units |
| unit2BedCount | Number of 2-bedroom units |
| villa4BedImage | Image of 4-bedroom villa (base64 or URL) |
| villa4BedPriceFrom | Starting price for 4-bedroom villa |
| villa4BedPriceTo | Maximum price for 4-bedroom villa |
| villa4BedAreaFrom | Minimum area for 4-bedroom villa |
| villa4BedAreaTo | Maximum area for 4-bedroom villa |
| villa4BedRateFrom | Minimum rate for 4-bedroom villa |
| villa4BedRateTo | Maximum rate for 4-bedroom villa |
| villa5BedImage | Image of 5-bedroom villa (base64 or URL) |
| villa5BedPriceFrom | Starting price for 5-bedroom villa |
| villa5BedPriceTo | Maximum price for 5-bedroom villa |
| villa5BedAreaFrom | Minimum area for 5-bedroom villa |
| villa5BedAreaTo | Maximum area for 5-bedroom villa |
| villa5BedRateFrom | Minimum rate for 5-bedroom villa |
| villa5BedRateTo | Maximum rate for 5-bedroom villa |
| totalPrice | Total price of the property |
| downPaymentPercent | Down payment percentage |
| downPaymentValue | Down payment amount |
| onBookingValue | On booking payment amount |
| adminFeeValue | Administrative fee amount |
| dldFeePercent | DLD fee percentage |
| dldFeeValue | DLD fee amount |
| duringConstructionPercent | During construction payment percentage |
| duringConstructionValue | During construction payment amount |
| onHandoverPercent | On handover payment percentage |
| onHandoverValue | On handover payment amount |
| postHandoverPercent | Post handover payment percentage |
| postHandoverValue | Post handover payment amount |
| fullImageP6 | Full image for page 6 (base64 or URL) |
| collage2Image1P7 | First collage image for page 7 (base64 or URL) |
| collage2Image2P7 | Second collage image for page 7 (base64 or URL) |
| fullImageP8 | Full image for page 8 (base64 or URL) |
| collage3Image1P9 | First collage image for page 9 (base64 or URL) |
| collage3Image2P9 | Second collage image for page 9 (base64 or URL) |
| collage3Image3P9 | Third collage image for page 9 (base64 or URL) |
| fullImageP10 | Full image for page 10 (base64 or URL) |
| devCompanyImage | Developer company image (base64 or URL) |
| devCompanyLogo | Developer company logo (base64 or URL) |
| devFoundationYear | Year the developer company was founded |
| devProjectsInProgress | Number of projects in progress |
| devCompletedProjects | Number of completed projects |
| devDescription | Description of the developer |

## Error Handling

All endpoints return appropriate HTTP status codes:

- 200: Success
- 400: Bad Request (missing required fields or invalid templates)
- 500: Server Error

Error responses include details:

```json
{
  "success": false,
  "error": "Missing required fields",
  "missingFields": ["propertyName"]
}
```

## Client Integration Example

### JavaScript Example

```javascript
// Function to generate PDF
async function generatePdf(data) {
  try {
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate PDF');
    }
    
    // Create blob from response
    const blob = await response.blob();
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `presentation-${data.propertyName || 'property'}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('PDF generation error:', error);
    alert(`Error generating PDF: ${error.message}`);
  }
}

// Function to get screenshots
async function getScreenshots(data) {
  try {
    const response = await fetch('/api/generate-screenshot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate screenshots');
    }
    
    const result = await response.json();
    return result.screenshots;
    
  } catch (error) {
    console.error('Screenshot generation error:', error);
    throw error;
  }
}
```
