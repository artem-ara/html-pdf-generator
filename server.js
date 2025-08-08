const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname)));

// Load templates on server startup
const templates = {};
const templatesFile = path.join(__dirname, "all-templates.js");

// Extract templates from all-templates.js
if (fs.existsSync(templatesFile)) {
	const fileContent = fs.readFileSync(templatesFile, "utf8");
	for (let i = 1; i <= 11; i++) {
		const templateKey = `page${i}`;
		const pattern = new RegExp(`window\\.PDF_TEMPLATES\\.${templateKey} = \`([\\s\\S]*?)\`;`, "m");
		const match = fileContent.match(pattern);
		if (match && match[1]) {
			templates[templateKey] = match[1];
		}
	}
}

// Define form element keys to field mappings
const fieldMappings = {
	propertyName: "{{property_name}}",
	backgroundUpload: "{{main_background}}",
	companyLogoUpload: "{{company_logo}}",
	avatarUpload: "{{avatar_img}}",
	presentationText: "{{presentation_text}}",
	lookText: "{{look_text}}",
	creationDate: "{{creation_date}}",
	agentName: "{{agent_name}}",
	agentTitle: "{{agent_title}}",
	agentPhone: "{{agent_phone}}",
	agentEmail: "{{agent_email}}",
	agentWebsite: "{{agent_website}}",
	developerLogo: "{{developer_logo}}",
	projectImageP2: "{{project_image_p2}}",
	developerName: "{{developer_name}}",
	districtName: "{{district_name}}",
	timelineStartDate: "{{timeline_start_date}}",
	timelineEndDate: "{{timeline_end_date}}",
	timelineProgressText: "{{timeline_progress_text}}",
	buildingImageP3: "{{building_image_p3}}",
	descriptionText: "{{description_text}}",
	unitStudioCount: "{{unit_studio_count}}",
	unit1BedCount: "{{unit_1_bed_count}}",
	unit2BedCount: "{{unit_2_bed_count}}",
	villa4BedImage: "{{villa_4_bed_image}}",
	villa4BedPriceFrom: "{{villa_4_bed_price_from}}",
	villa4BedPriceTo: "{{villa_4_bed_price_to}}",
	villa4BedAreaFrom: "{{villa_4_bed_area_from}}",
	villa4BedAreaTo: "{{villa_4_bed_area_to}}",
	villa4BedRateFrom: "{{villa_4_bed_rate_from}}",
	villa4BedRateTo: "{{villa_4_bed_rate_to}}",
	villa5BedImage: "{{villa_5_bed_image}}",
	villa5BedPriceFrom: "{{villa_5_bed_price_from}}",
	villa5BedPriceTo: "{{villa_5_bed_price_to}}",
	villa5BedAreaFrom: "{{villa_5_bed_area_from}}",
	villa5BedAreaTo: "{{villa_5_bed_area_to}}",
	villa5BedRateFrom: "{{villa_5_bed_rate_from}}",
	villa5BedRateTo: "{{villa_5_bed_rate_to}}",
	totalPrice: "{{total_price}}",
	downPaymentPercent: "{{down_payment_percent}}",
	downPaymentValue: "{{down_payment_value}}",
	onBookingValue: "{{on_booking_value}}",
	adminFeeValue: "{{admin_fee_value}}",
	dldFeePercent: "{{dld_fee_percent}}",
	dldFeeValue: "{{dld_fee_value}}",
	duringConstructionPercent: "{{during_construction_percent}}",
	duringConstructionValue: "{{during_construction_value}}",
	onHandoverPercent: "{{on_handover_percent}}",
	onHandoverValue: "{{on_handover_value}}",
	postHandoverPercent: "{{post_handover_percent}}",
	postHandoverValue: "{{post_handover_value}}",
	fullImageP6: "{{full_image_p6}}",
	collage2Image1P7: "{{collage2_image1_p7}}",
	collage2Image2P7: "{{collage2_image2_p7}}",
	fullImageP8: "{{full_image_p8}}",
	collage3Image1P9: "{{collage3_image1_p9}}",
	collage3Image2P9: "{{collage3_image2_p9}}",
	collage3Image3P9: "{{collage3_image3_p9}}",
	fullImageP10: "{{full_image_p10}}",
	devCompanyImage: "{{dev_company_image}}",
	devCompanyLogo: "{{dev_company_logo}}",
	devFoundationYear: "{{dev_foundation_year}}",
	devProjectsInProgress: "{{dev_projects_in_progress}}",
	devCompletedProjects: "{{dev_completed_projects}}",
	devDescription: "{{dev_description}}",
};

// Special cases: fields that are the same value but different placeholders
const specialMappings = {
	propertyName: ["{{project_title_p2}}", "{{project_title_p3}}"],
	developerLogo: ["{{developer_logo_p3}}"],
};

// Default image URLs
const defaultImages = {
	backgroundUpload:
		"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&crop=center",
	companyLogoUpload: "https://i.ibb.co/7jR3Y1V/luxury-logo.png",
	avatarUpload:
		"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
	developerLogo:
		"https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=center",
	projectImageP2:
		"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=1000&fit=crop&crop=center",
	buildingImageP3:
		"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=1200&fit=crop&crop=center",
	villa4BedImage:
		"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=600&fit=crop&crop=center",
	villa5BedImage:
		"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=600&fit=crop&crop=center",
	fullImageP6:
		"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop",
	collage2Image1P7:
		"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
	collage2Image2P7:
		"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop",
	fullImageP8:
		"https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1974&auto=format&fit=crop",
	collage3Image1P9:
		"https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop",
	collage3Image2P9:
		"https://images.unsplash.com/photo-1605276374104-5de67d216b8a?q=80&w=2070&auto=format&fit=crop",
	collage3Image3P9:
		"https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop",
	fullImageP10:
		"https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop",
	devCompanyImage:
		"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&crop=center",
	devCompanyLogo:
		"https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=128&h=128&fit=crop&crop=center",
};

// Auto-detect placeholders in HTML templates
function detectPlaceholders(html) {
	const placeholderRegex = /{{([^}]+)}}/g;
	const placeholders = new Set();
	let match;

	while ((match = placeholderRegex.exec(html)) !== null) {
		placeholders.add(match[0]);
	}

	// Check for placeholders in url('placeholder')
	const urlRegex = /url\('{{([^}]+)}}'\)/g;
	while ((match = urlRegex.exec(html)) !== null) {
		placeholders.add(`{{${match[1]}}}`);
	}

	return Array.from(placeholders);
}

// Replace placeholders in HTML template
function replacePlaceholders(html, data) {
	// Find all placeholders in the template
	const placeholders = detectPlaceholders(html);

	// Create a mapping from placeholders to data values
	const replacements = {};

	// First process normal field mappings
	for (const [fieldName, placeholder] of Object.entries(fieldMappings)) {
		if (data[fieldName]) {
			replacements[placeholder] = data[fieldName];
		} else if (defaultImages[fieldName]) {
			// Use default image if available and field is for an image
			replacements[placeholder] = defaultImages[fieldName];
		}
	}

	// Then handle special cases where one field maps to multiple placeholders
	for (const [fieldName, additionalPlaceholders] of Object.entries(specialMappings)) {
		if (data[fieldName]) {
			additionalPlaceholders.forEach(placeholder => {
				replacements[placeholder] = data[fieldName];
			});
		}
	}

	// Replace all placeholders in the template
	let result = html;
	for (const placeholder of placeholders) {
		const value = replacements[placeholder] || "";

		// Handle url() placeholders differently
		if (placeholder.includes("background") || placeholder.includes("image")) {
			result = result.replace(new RegExp(`url\\('${placeholder}'\\)`, "g"), `url('${value}')`);
		}

		// Regular placeholder replacement
		result = result.replace(new RegExp(placeholder, "g"), value);
	}

	return result;
}

// Create full HTML document
function createFullHtml(pageTemplates, data) {
	let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Generated PDF</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        .page-break { page-break-after: always; height: 0; display: block; }
      </style>
    </head>
    <body>
  `;

	const pageIds = Object.keys(pageTemplates).sort();
	if (pageIds.length === 0) {
		throw new Error("No templates available for rendering");
	}

	try {
		for (let i = 0; i < pageIds.length; i++) {
			const pageTemplate = pageTemplates[pageIds[i]];
			if (!pageTemplate) {
				console.warn(`Template for ${pageIds[i]} is empty or invalid, skipping`);
				continue;
			}

			const renderedTemplate = replacePlaceholders(pageTemplate, data);
			html += renderedTemplate;
			if (i < pageIds.length - 1) {
				html += '<div class="page-break"></div>';
			}
		}
	} catch (error) {
		console.error("Error rendering templates:", error);
		throw new Error(`Template rendering failed: ${error.message}`);
	}

	html += `
    </body>
    </html>
  `;

	return html;
}

// Basic validation function for required data fields
function validateInputData(data) {
	// Required fields that should be present
	const requiredFields = ["propertyName"];
	const missingFields = [];

	for (const field of requiredFields) {
		if (!data[field]) {
			missingFields.push(field);
		}
	}

	return missingFields;
}

// Screenshot generation endpoint
app.post("/api/generate-screenshot", async (req, res) => {
	try {
		const data = req.body;

		// Validate input data
		const missingFields = validateInputData(data);
		if (missingFields.length > 0) {
			return res.status(400).json({
				error: "Missing required fields",
				missingFields,
			});
		}

		const selectedPages = data.pages || Object.keys(templates); // Default to all pages if none specified

		// Create subset of templates based on selected pages
		const selectedTemplates = {};
		for (const pageId of selectedPages) {
			if (templates[pageId]) {
				selectedTemplates[pageId] = templates[pageId];
			}
		}

		if (Object.keys(selectedTemplates).length === 0) {
			return res.status(400).json({ error: "No valid templates selected" });
		}

		// Generate full HTML from templates with the provided data
		const html = createFullHtml(selectedTemplates, data);

		// Launch Puppeteer
		const browser = await puppeteer.launch({
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
			headless: true,
		});

		const page = await browser.newPage();

		// Set viewport to match A4 landscape size (297mm x 210mm) at 300 DPI
		await page.setViewport({
			width: 3508, // 297mm at 300 DPI
			height: 2480, // 210mm at 300 DPI
			deviceScaleFactor: 1,
		});

		await page.setContent(html, { waitUntil: "networkidle0" });

		// Allow time for font loading and rendering
		await page.evaluateHandle("document.fonts.ready");

		// Take screenshots of each page section
		const screenshots = [];
		for (let i = 0; i < Object.keys(selectedTemplates).length; i++) {
			const elementHandle = await page.evaluateHandle(i => document.body.children[i], i);

			const boundingBox = await elementHandle.boundingBox();

			if (boundingBox) {
				const screenshot = await page.screenshot({
					clip: {
						x: boundingBox.x,
						y: boundingBox.y,
						width: boundingBox.width,
						height: boundingBox.height,
					},
					encoding: "base64",
				});

				screenshots.push({
					page: Object.keys(selectedTemplates)[i],
					data: `data:image/png;base64,${screenshot}`,
				});
			}

			await elementHandle.dispose();
		}

		await browser.close();

		// Return the screenshots
		res.json({
			success: true,
			screenshots,
		});
	} catch (error) {
		console.error("Error generating screenshot:", error);
		let errorMessage = "Error generating screenshot";

		// Provide more specific error messages for common errors
		if (error.message.includes("timeout")) {
			errorMessage = "Operation timed out while generating screenshots";
		} else if (error.message.includes("navigation")) {
			errorMessage = "Navigation error while loading page content";
		} else if (error.message.includes("Template rendering failed")) {
			errorMessage = error.message;
		}

		res.status(500).json({
			success: false,
			error: errorMessage,
			details: error.message,
		});
	}
});

// PDF generation endpoint
app.post("/api/generate-pdf", async (req, res) => {
	try {
		const data = req.body;

		// Validate input data
		const missingFields = validateInputData(data);
		if (missingFields.length > 0) {
			return res.status(400).json({
				error: "Missing required fields",
				missingFields,
			});
		}

		const selectedPages = data.pages || Object.keys(templates); // Default to all pages if none specified

		// Create subset of templates based on selected pages
		const selectedTemplates = {};
		for (const pageId of selectedPages) {
			if (templates[pageId]) {
				selectedTemplates[pageId] = templates[pageId];
			}
		}

		if (Object.keys(selectedTemplates).length === 0) {
			return res.status(400).json({ error: "No valid templates selected" });
		}

		// Generate full HTML from templates with the provided data
		const html = createFullHtml(selectedTemplates, data);

		// Launch Puppeteer
		const browser = await puppeteer.launch({
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
			headless: true,
		});

		const page = await browser.newPage();

		// Set the page size to A4 Landscape
		await page.setViewport({
			width: 3508, // 297mm at 300 DPI
			height: 2480, // 210mm at 300 DPI
			deviceScaleFactor: 1,
		});

		await page.setContent(html, { waitUntil: "networkidle0" });

		// Wait for fonts to load
		await page.evaluateHandle("document.fonts.ready");

		// Generate PDF
		const pdfBuffer = await page.pdf({
			format: "A4",
			landscape: true,
			printBackground: true,
			margin: {
				top: "0",
				right: "0",
				bottom: "0",
				left: "0",
			},
		});

		await browser.close();

		// Set response headers and send PDF
		res.setHeader("Content-Type", "application/pdf");
		res.setHeader(
			"Content-Disposition",
			`attachment; filename="presentation-${data.propertyName || "property"}.pdf"`
		);
		res.send(pdfBuffer);
	} catch (error) {
		console.error("Error generating PDF:", error);
		let errorMessage = "Error generating PDF";

		// Provide more specific error messages for common errors
		if (error.message.includes("timeout")) {
			errorMessage = "Operation timed out while generating PDF";
		} else if (error.message.includes("navigation")) {
			errorMessage = "Navigation error while loading page content";
		} else if (error.message.includes("Template rendering failed")) {
			errorMessage = error.message;
		}

		res.status(500).json({
			success: false,
			error: errorMessage,
			details: error.message,
		});
	}
});

// API endpoint for getting available templates
app.get("/api/templates", (req, res) => {
	const templateKeys = Object.keys(templates).map(key => {
		return { id: key, name: key.replace("page", "Page ") };
	});

	res.json({
		success: true,
		templates: templateKeys,
	});
});

// Homepage route
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	console.log(`Templates loaded: ${Object.keys(templates).length}`);
});
