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

// Load HTML templates directly from page files
for (let i = 1; i <= 11; i++) {
	const templateKey = `page${i}`;
	const pageFile = path.join(__dirname, `page-${i}.html`);

	if (fs.existsSync(pageFile)) {
		templates[templateKey] = fs.readFileSync(pageFile, "utf8");
	} else {
		console.warn(`Template file for ${templateKey} not found: ${pageFile}`);
	}
}

// Функция для преобразования структурированного JSON в плоский формат
function flattenPageData(data) {
	// Если данные уже в плоском формате, возвращаем их как есть
	if (!data.page1 && !data.page2) {
		return data;
	}

	// Иначе собираем плоский объект из вложенных страниц
	const flatData = {};

	// Обрабатываем все страницы от 1 до 11
	for (let i = 1; i <= 11; i++) {
		const pageKey = `page${i}`;
		if (data[pageKey]) {
			// Копируем все свойства из страницы в плоский объект
			Object.assign(flatData, data[pageKey]);
		}
	}

	// Обрабатываем специальные свойства верхнего уровня
	if (data.pages) {
		flatData.pages = data.pages;
	}

	// Для совместимости: если есть property_name в page1, используем его как propertyName
	if (data.page1 && data.page1.property_name) {
		flatData.propertyName = data.page1.property_name;
	}

	return flatData;
}

// Define form element keys to field mappings
const fieldMappings = {
	propertyName: "{{property_name}}",
	property_name: "{{property_name}}", // Добавлен альтернативный ключ

	// Страница 1
	main_background: "{{main_background}}",
	backgroundUpload: "{{main_background}}",
	company_logo: "{{company_logo}}",
	companyLogoUpload: "{{company_logo}}",
	avatar_img: "{{avatar_img}}",
	avatarUpload: "{{avatar_img}}",
	presentation_text: "{{presentation_text}}",
	presentationText: "{{presentation_text}}",
	look_text: "{{look_text}}",
	lookText: "{{look_text}}",
	creation_date: "{{creation_date}}",
	creationDate: "{{creation_date}}",
	agent_name: "{{agent_name}}",
	agentName: "{{agent_name}}",
	agent_title: "{{agent_title}}",
	agentTitle: "{{agent_title}}",
	agent_phone: "{{agent_phone}}",
	agentPhone: "{{agent_phone}}",
	agent_email: "{{agent_email}}",
	agentEmail: "{{agent_email}}",
	agent_website: "{{agent_website}}",
	agentWebsite: "{{agent_website}}",

	// Страница 2
	project_title_p2: "{{project_title_p2}}",
	developer_logo: "{{developer_logo}}",
	developerLogo: "{{developer_logo}}",
	developer_name: "{{developer_name}}",
	developerName: "{{developer_name}}",
	district_name: "{{district_name}}",
	districtName: "{{district_name}}",
	timeline_start_date: "{{timeline_start_date}}",
	timelineStartDate: "{{timeline_start_date}}",
	timeline_end_date: "{{timeline_end_date}}",
	timelineEndDate: "{{timeline_end_date}}",
	timeline_progress_text: "{{timeline_progress_text}}",
	timelineProgressText: "{{timeline_progress_text}}",
	project_image_p2: "{{project_image_p2}}",
	projectImageP2: "{{project_image_p2}}",

	// Страница 3
	building_image_p3: "{{building_image_p3}}",
	buildingImageP3: "{{building_image_p3}}",
	project_title_p3: "{{project_title_p3}}",
	developer_logo_p3: "{{developer_logo_p3}}",
	developer_name_p3: "{{developer_name_p3}}",
	description_text: "{{description_text}}",
	descriptionText: "{{description_text}}",

	// Страница 4
	unit_studio_count: "{{unit_studio_count}}",
	unitStudioCount: "{{unit_studio_count}}",
	unit_1_bed_count: "{{unit_1_bed_count}}",
	unit1BedCount: "{{unit_1_bed_count}}",
	unit_2_bed_count: "{{unit_2_bed_count}}",
	unit2BedCount: "{{unit_2_bed_count}}",
	villa_4_bed_image: "{{villa_4_bed_image}}",
	villa4BedImage: "{{villa_4_bed_image}}",
	villa_4_bed_price_from: "{{villa_4_bed_price_from}}",
	villa4BedPriceFrom: "{{villa_4_bed_price_from}}",
	villa_4_bed_price_to: "{{villa_4_bed_price_to}}",
	villa4BedPriceTo: "{{villa_4_bed_price_to}}",
	villa_4_bed_area_from: "{{villa_4_bed_area_from}}",
	villa4BedAreaFrom: "{{villa_4_bed_area_from}}",
	villa_4_bed_area_to: "{{villa_4_bed_area_to}}",
	villa4BedAreaTo: "{{villa_4_bed_area_to}}",
	villa_4_bed_rate_from: "{{villa_4_bed_rate_from}}",
	villa4BedRateFrom: "{{villa_4_bed_rate_from}}",
	villa_4_bed_rate_to: "{{villa_4_bed_rate_to}}",
	villa4BedRateTo: "{{villa_4_bed_rate_to}}",
	villa_5_bed_image: "{{villa_5_bed_image}}",
	villa5BedImage: "{{villa_5_bed_image}}",
	villa_5_bed_price_from: "{{villa_5_bed_price_from}}",
	villa5BedPriceFrom: "{{villa_5_bed_price_from}}",
	villa_5_bed_price_to: "{{villa_5_bed_price_to}}",
	villa5BedPriceTo: "{{villa_5_bed_price_to}}",
	villa_5_bed_area_from: "{{villa_5_bed_area_from}}",
	villa5BedAreaFrom: "{{villa_5_bed_area_from}}",
	villa_5_bed_area_to: "{{villa_5_bed_area_to}}",
	villa5BedAreaTo: "{{villa_5_bed_area_to}}",
	villa_5_bed_rate_from: "{{villa_5_bed_rate_from}}",
	villa5BedRateFrom: "{{villa_5_bed_rate_from}}",
	villa_5_bed_rate_to: "{{villa_5_bed_rate_to}}",
	villa5BedRateTo: "{{villa_5_bed_rate_to}}",

	// Страница 5
	total_price: "{{total_price}}",
	totalPrice: "{{total_price}}",
	down_payment_percent: "{{down_payment_percent}}",
	downPaymentPercent: "{{down_payment_percent}}",
	down_payment_value: "{{down_payment_value}}",
	downPaymentValue: "{{down_payment_value}}",
	on_booking_value: "{{on_booking_value}}",
	onBookingValue: "{{on_booking_value}}",
	admin_fee_value: "{{admin_fee_value}}",
	adminFeeValue: "{{admin_fee_value}}",
	dld_fee_percent: "{{dld_fee_percent}}",
	dldFeePercent: "{{dld_fee_percent}}",
	dld_fee_value: "{{dld_fee_value}}",
	dldFeeValue: "{{dld_fee_value}}",
	during_construction_percent: "{{during_construction_percent}}",
	duringConstructionPercent: "{{during_construction_percent}}",
	during_construction_value: "{{during_construction_value}}",
	duringConstructionValue: "{{during_construction_value}}",
	on_handover_percent: "{{on_handover_percent}}",
	onHandoverPercent: "{{on_handover_percent}}",
	on_handover_value: "{{on_handover_value}}",
	onHandoverValue: "{{on_handover_value}}",
	post_handover_percent: "{{post_handover_percent}}",
	postHandoverPercent: "{{post_handover_percent}}",
	post_handover_value: "{{post_handover_value}}",
	postHandoverValue: "{{post_handover_value}}",

	// Страница 6
	full_image_p6: "{{full_image_p6}}",
	fullImageP6: "{{full_image_p6}}",

	// Страница 7
	collage2_image1_p7: "{{collage2_image1_p7}}",
	collage2Image1P7: "{{collage2_image1_p7}}",
	collage2_image2_p7: "{{collage2_image2_p7}}",
	collage2Image2P7: "{{collage2_image2_p7}}",

	// Страница 8
	full_image_p8: "{{full_image_p8}}",
	fullImageP8: "{{full_image_p8}}",

	// Страница 9
	collage3_image1_p9: "{{collage3_image1_p9}}",
	collage3Image1P9: "{{collage3_image1_p9}}",
	collage3_image2_p9: "{{collage3_image2_p9}}",
	collage3Image2P9: "{{collage3_image2_p9}}",
	collage3_image3_p9: "{{collage3_image3_p9}}",
	collage3Image3P9: "{{collage3_image3_p9}}",

	// Страница 10
	full_image_p10: "{{full_image_p10}}",
	fullImageP10: "{{full_image_p10}}",

	// Страница 11
	dev_company_image: "{{dev_company_image}}",
	devCompanyImage: "{{dev_company_image}}",
	dev_company_logo: "{{dev_company_logo}}",
	devCompanyLogo: "{{dev_company_logo}}",
	dev_foundation_year: "{{dev_foundation_year}}",
	devFoundationYear: "{{dev_foundation_year}}",
	dev_projects_in_progress: "{{dev_projects_in_progress}}",
	devProjectsInProgress: "{{dev_projects_in_progress}}",
	dev_completed_projects: "{{dev_completed_projects}}",
	devCompletedProjects: "{{dev_completed_projects}}",
	dev_description: "{{dev_description}}",
	devDescription: "{{dev_description}}",
};

// Special cases: fields that are the same value but different placeholders
const specialMappings = {
	property_name: ["{{project_title_p2}}", "{{project_title_p3}}"],
	developer_logo: ["{{developer_logo_p3}}"],
};

// Default images to use if not provided
const defaultImages = {
	backgroundUpload: "https://example.com/default-background.jpg",
	companyLogoUpload: "https://example.com/default-company-logo.png",
	avatarUpload: "https://example.com/default-avatar.jpg",
	developerLogo: "https://example.com/default-developer-logo.png",
	projectImageP2: "https://example.com/default-project-image.jpg",
	buildingImageP3: "https://example.com/default-building-image.jpg",
};

// Function to find all {{placeholders}} in a template
function detectPlaceholders(html) {
	const placeholderRegex = /{{([^{}]+)}}/g;
	const placeholders = new Set();
	let match;

	while ((match = placeholderRegex.exec(html)) !== null) {
		placeholders.add(match[0]);
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
		// Проверяем наличие значения и что оно не undefined
		if (data[fieldName] !== undefined) {
			replacements[placeholder] = data[fieldName];
		} else if (defaultImages[fieldName]) {
			// Use default image if available and field is for an image
			replacements[placeholder] = defaultImages[fieldName];
		}
	}

	// Then handle special cases where one field maps to multiple placeholders
	for (const [fieldName, additionalPlaceholders] of Object.entries(specialMappings)) {
		if (data[fieldName] !== undefined) {
			additionalPlaceholders.forEach(placeholder => {
				replacements[placeholder] = data[fieldName];
			});
		}
	}

	// Replace all placeholders in the template
	let result = html;
	for (const placeholder of placeholders) {
		const value = replacements[placeholder] !== undefined ? replacements[placeholder] : "";

		// Handle url() placeholders differently
		if (placeholder.includes("background") || placeholder.includes("image")) {
			result = result.replace(new RegExp(`url\\('${placeholder}'\\)`, "g"), `url('${value}')`);
		}

		// Regular placeholder replacement
		result = result.replace(new RegExp(placeholder, "g"), value);
	}

	return result;
}

// Create a full HTML document from page templates
function createFullHtml(pageTemplates, data) {
	let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>PDF Template</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
        }
        .page-break {
          page-break-after: always;
          break-after: page;
        }
      </style>
    </head>
    <body>`;

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
    </html>`;

	return html;
}

// Validate input data
function validateInputData(data) {
	// Currently only requiring property name, add more as needed
	const requiredFields = ["propertyName"];
	const missingFields = [];

	for (const field of requiredFields) {
		if (!data[field]) {
			missingFields.push(field);
		}
	}

	return missingFields;
}

// API endpoint to generate PDF
app.post("/api/generate-pdf", async (req, res) => {
	try {
		// Преобразуем структурированные данные в плоский формат
		const data = flattenPageData(req.body);

		// Validate input data
		const missingFields = validateInputData(data);
		if (missingFields.length > 0) {
			return res.status(400).json({
				error: "Missing required fields",
				missingFields,
			});
		}

		const selectedPages = data.pages || Object.keys(templates);
		const selectedTemplates = {};

		for (const pageId of selectedPages) {
			if (templates[pageId]) {
				selectedTemplates[pageId] = templates[pageId];
			}
		}

		const html = createFullHtml(selectedTemplates, data);

		// Launch browser and generate PDF
		const browser = await puppeteer.launch({
			headless: "new",
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});

		const page = await browser.newPage();
		await page.setContent(html, {
			waitUntil: "networkidle0",
			timeout: 30000,
		});

		const pdf = await page.pdf({
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

		res.contentType("application/pdf");
		res.setHeader("Content-Disposition", "attachment; filename=presentation.pdf");
		res.send(pdf);
	} catch (error) {
		console.error("Error generating PDF:", error);

		// Enhanced error messages
		let errorMessage = "Error generating PDF";
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

// API endpoint to generate screenshots
app.post("/api/generate-screenshot", async (req, res) => {
	try {
		// Преобразуем структурированные данные в плоский формат
		const data = flattenPageData(req.body);

		// Validate input data
		const missingFields = validateInputData(data);
		if (missingFields.length > 0) {
			return res.status(400).json({
				error: "Missing required fields",
				missingFields,
			});
		}

		const selectedPages = data.pages || Object.keys(templates);
		const selectedTemplates = {};

		for (const pageId of selectedPages) {
			if (templates[pageId]) {
				selectedTemplates[pageId] = templates[pageId];
			}
		}

		const html = createFullHtml(selectedTemplates, data);

		// Launch browser and generate screenshots
		const browser = await puppeteer.launch({
			headless: "new",
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});

		const page = await browser.newPage();
		await page.setViewport({
			width: 1122, // A4 width in pixels at 96 DPI
			height: 793, // A4 height in pixels at 96 DPI
			deviceScaleFactor: 2, // Higher resolution
		});

		await page.setContent(html, {
			waitUntil: "networkidle0",
			timeout: 30000,
		});

		// Get all page divs
		const pageDivs = await page.$$("body > div");
		const screenshots = [];

		for (let i = 0; i < pageDivs.length; i++) {
			const pageId = selectedPages[i];
			const screenshot = await pageDivs[i].screenshot({
				type: "png",
				encoding: "base64",
			});

			screenshots.push({
				page: pageId,
				image: screenshot,
			});
		}

		await browser.close();

		res.json({
			success: true,
			screenshots,
		});
	} catch (error) {
		console.error("Error generating screenshot:", error);

		// Enhanced error messages
		let errorMessage = "Error generating screenshot";
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

// API endpoint to list available templates
app.get("/api/templates", (req, res) => {
	res.json({
		success: true,
		templates: Object.keys(templates),
	});
});

// Serve the HTML for the homepage
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});