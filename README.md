# PDF Generator Server

Server for generating PDF presentations from HTML templates with dynamic data.

## Features

- Generate PDFs from HTML templates with custom data
- Generate individual page screenshots
- Support for all image types and placeholder replacement
- RESTful API endpoints for integration

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd reelly
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on port 3000 by default. You can change this by setting the PORT environment variable.

## API Endpoints

### 1. Generate PDF

**Endpoint:** `POST /api/generate-pdf`

Generates a PDF document based on the provided data and selected templates.

**Request Body:**

```json
{
  "propertyName": "ELO 2 Damac Hills",
  "presentationText": "Presentation prepared by Luxary Real Estate",
  "lookText": "Look what we find for you",
  "creationDate": "Date of creation 22.04.2025",
  "agentName": "Svetlana Frolova",
  "agentTitle": "Luxury Real Estate",
  "agentPhone": "+971 50 355 44 22",
  "agentEmail": "s.frolova@fiduproperties.ae",
  "agentWebsite": "fiduproperties.ae",
  "developerName": "Damac Properties",
  "districtName": "Damac Hills, Dubai",
  "timelineStartDate": "Q4 2024",
  "timelineEndDate": "Q1 2026",
  "timelineProgressText": "Up to 15 months left to expected handover",
  "descriptionText": "Welcome to Damac Elo 2 and 3, an exceptional addition to the dynamic DAMAC Hills 2 community...",
  "unitStudioCount": "239",
  "unit1BedCount": "59",
  "unit2BedCount": "64",
  "villa4BedPriceFrom": "AED 610,000",
  "villa4BedPriceTo": "AED 610,000",
  "villa4BedAreaFrom": "160.6 m2",
  "villa4BedAreaTo": "160.6 m2",
  "villa4BedRateFrom": "AED 6,000/m2",
  "villa4BedRateTo": "AED 9,000/m2",
  "villa5BedPriceFrom": "AED 610,000",
  "villa5BedPriceTo": "AED 610,000",
  "villa5BedAreaFrom": "160.6 m2",
  "villa5BedAreaTo": "160.6 m2",
  "villa5BedRateFrom": "AED 6,000/m2",
  "villa5BedRateTo": "AED 9,000/m2",
  "totalPrice": "AED 500,000",
  "downPaymentPercent": "10%",
  "downPaymentValue": "AED 100,000",
  "onBookingValue": "AED 20,000",
  "adminFeeValue": "AED 20,000",
  "dldFeePercent": "4%",
  "dldFeeValue": "AED 20,000",
  "duringConstructionPercent": "30%",
  "duringConstructionValue": "AED 100,000",
  "onHandoverPercent": "60%",
  "onHandoverValue": "AED 100,000",
  "postHandoverPercent": "60%",
  "postHandoverValue": "AED 100,000",
  "devFoundationYear": "2002",
  "devProjectsInProgress": "24",
  "devCompletedProjects": "61",
  "devDescription": "DAMAC Properties is part of DAMAC Group that has been shaping the Middle East's luxury real estate market since 1982...",
  "pages": ["page1", "page2", "page3"]
}
```

**Note:** The `pages` field is optional. If not provided, all available templates will be included in the PDF.

**Response:** PDF file as attachment.

### 2. Generate Screenshots

**Endpoint:** `POST /api/generate-screenshot`

Generates screenshots for each page based on the provided data.

**Request Body:** Same as the PDF endpoint.

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

### 3. Get Available Templates

**Endpoint:** `GET /api/templates`

Returns a list of available templates.

**Response:**

```json
{
  "success": true,
  "templates": [
    { "id": "page1", "name": "Page 1" },
    { "id": "page2", "name": "Page 2" }
  ]
}
```

## Image Data

You can provide base64-encoded image data for any of the image fields:

```json
{
  "backgroundUpload": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
  "companyLogoUpload": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

If no image data is provided, default placeholder images will be used.

## Client Usage Example

```javascript
// Generate PDF
fetch('/api/generate-pdf', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    propertyName: 'ELO 2 Damac Hills',
    // Add other fields as needed
    pages: ['page1', 'page2', 'page3']
  })
})
.then(response => response.blob())
.then(blob => {
  // Create download link
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'presentation.pdf';
  a.click();
});
```
