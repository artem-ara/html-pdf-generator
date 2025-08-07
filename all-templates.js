// Expose a global templates registry
window.PDF_TEMPLATES = window.PDF_TEMPLATES || {};

// Page 1 Template
window.PDF_TEMPLATES.page1 = `<div style="width: 297mm; height: 210mm; overflow: hidden;">
  <style>
    .p1-render-body {
      font-family: 'Inter', sans-serif;
      width: 100%;
      height: 100%;
      overflow: hidden;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .p1-barnes-container {
      width: 100%;
      height: 100%;
      background-image: linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 23.981%),
      linear-gradient(rgba(0, 0, 0, 0.1) 38.75%, rgb(0, 0, 0) 100%),
      url('{{main_background}}');
      background-size: auto, auto, cover;
      background-position: 0% 0%, 0% 0%, 50% 50%;
      position: relative;
    }

    .p1-main-content {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .p1-content-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 52px 56px;
      width: 100%;
      height: 100%;
      gap: 20px;
    }

    .p1-left-content {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
      justify-content: space-between;
      min-width: 0;
      color: #ffffff;
      height: 100%;
    }

    .p1-header {
      display: flex;
      width: 100%;
    }

    .p1-presentation-text {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 20px;
      line-height: 1.5;
      color: #ffffff;
    }

    .p1-main-text-section {
      display: flex;
      flex-direction: column;
      gap: 21px;
      align-items: flex-start;
      justify-content: flex-end;
      color: #ffffff;
      width: 100%;
    }

    .p1-property-info {
      display: flex;
      flex-direction: column;
      gap: 6px;
      align-items: flex-start;
      justify-content: flex-end;
      width: 100%;
    }

    .p1-look-text {
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 28px;
      line-height: 1.2;
      text-transform: lowercase;
      width: 100%;
    }

    .p1-property-name {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 72px;
      line-height: 1;
      width: 100%;
    }

    .p1-creation-date {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 20px;
      line-height: 1.5;
      opacity: 0.4;
      color: #ffffff;
      width: 100%;
    }

    .p1-right-content {
      flex: 0 0 440px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .p1-agent-card {
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 27px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      overflow: hidden;
    }

    .p1-company-section {
      width: 100%;
      position: relative;
    }

    .p1-company-bg {
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
      background: #1b402b;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px 24px 0 0;
      height: 160px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .p1-company-logo-img {
      max-width: 100%;
      max-height: 100%;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .p1-agent-info-section {
      padding: 0 30px 30px 30px;
      width: 100%;
      margin-top: -60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      gap: 20px;
    }

    .p1-agent-photo {
      width: 120px;
      height: 120px;
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid #f0f0f4;
      background: #ffffff;
      position: relative;
      z-index: 2;
    }

    .p1-agent-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .p1-agent-name-section {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 100%;
      color: #ffffff;
      text-align: center;
    }

    .p1-agent-name {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 30px;
      line-height: 1;
      color: #ffffff;
    }

    .p1-agent-title {
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 20px;
      line-height: 1;
      color: #ffffff;
      opacity: 0.6;
    }

    .p1-verification-badges {
      display: flex;
      flex-direction: row;
      gap: 8px;
      align-items: center;
    }

    .p1-verified-badge,
    .p1-license-badge {
      display: flex;
      flex-direction: row;
      align-items: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      overflow: hidden;
      padding: 0;
    }

    .p1-verified-badge {
      background: rgba(0, 132, 255, 0.2);
    }

    .p1-license-badge {
      background: rgba(0, 177, 32, 0.2);
    }

    .p1-badge-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      height: 40px;
    }

    .p1-badge-text {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 16px;
      color: #ffffff;
      padding: 10px;
      text-align: center;
      border-left: 1px solid rgba(255, 255, 255, 0.1);
    }

    .p1-license-number {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 16px;
      color: #ffffff;
      padding: 10px;
      text-align: center;
      border-left: 1px solid rgba(157, 255, 199, 0.19);
    }

    .p1-contact-info {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    .p1-contact-item {
      display: flex;
      flex-direction: row;
      gap: 15px;
      align-items: center;
    }

    .p1-contact-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 8px;
    }

    .p1-contact-text {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 18px;
      color: #ffffff;
    }

    .p1-languages-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }

    .p1-languages-title {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 20px;
      line-height: 1;
      opacity: 0.6;
      color: #ffffff;
      width: 100%;
    }

    .p1-language-badges {
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: center;
      width: 100%;
    }

    .p1-language-badge {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 10px 14px;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 16px;
      color: #ffffff;
    }
  </style>
  <div class="p1-render-body">
    <div class="p1-barnes-container">
      <div class="p1-main-content">
        <div class="p1-content-wrapper">
          <div class="p1-left-content">
            <div class="p1-header">
              <div class="p1-presentation-text">{{presentation_text}}</div>
            </div>
            <div class="p1-main-text-section">
              <div class="p1-property-info">
                <div class="p1-look-text">{{look_text}}</div>
                <div class="p1-property-name">{{property_name}}</div>
              </div>
              <div class="p1-creation-date">{{creation_date}}</div>
            </div>
          </div>
          <div class="p1-right-content">
            <div class="p1-agent-card">
              <div class="p1-company-section">
                <div class="p1-company-bg">
                  <img src="{{company_logo}}" alt="Company Logo" class="p1-company-logo-img">
                </div>
              </div>
              <div class="p1-agent-info-section">
                <div class="p1-agent-photo">
                  <img src="{{avatar_img}}" alt="Agent Avatar" />
                </div>
                <div class="p1-agent-name-section">
                  <div class="p1-agent-name">{{agent_name}}</div>
                  <div class="p1-agent-title">{{agent_title}}</div>
                </div>
                <div class="p1-verification-badges">
                  <div class="p1-verified-badge">
                    <div class="p1-badge-icon"><svg width="27" height="27" viewBox="0 0 27 27" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.162 0L16.314 2.42748L20.2779 2.08942L21.6171 5.83562L25.1346 7.69431L24.2358 11.5698L26.1901 15.0352L23.3387 17.8096L23.1092 21.7813L19.2105 22.5737L16.8702 25.7909L13.162 24.3497L9.45384 25.7909L7.11348 22.5737L3.21483 21.7813L2.98531 17.8096L0.13397 15.0352L2.08818 11.5698L1.18942 7.69431L4.7069 5.83562L6.04609 2.08942L10.0101 2.42748L13.162 0Z"
                          fill="#0085FF" />
                        <path d="M8.42423 13.1617L11.5831 16.3206L18.4274 9.47637" stroke="white"
                          stroke-width="2.6324" />
                      </svg></div>
                    <div class="p1-badge-text">Verified</div>
                  </div>
                  <div class="p1-license-badge">
                    <div class="p1-badge-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 13.0004C20 18.0004 16.5 20.5005 12.34 21.9505C12.1222 22.0243 11.8855 22.0207 11.67 21.9405C7.5 20.5005 4 18.0004 4 13.0004V6.00045C4 5.73523 4.10536 5.48088 4.29289 5.29334C4.48043 5.10581 4.73478 5.00045 5 5.00045C7 5.00045 9.5 3.80045 11.24 2.28045C11.4519 2.09945 11.7214 2 12 2C12.2786 2 12.5481 2.09945 12.76 2.28045C14.51 3.81045 17 5.00045 19 5.00045C19.2652 5.00045 19.5196 5.10581 19.7071 5.29334C19.8946 5.48088 20 5.73523 20 6.00045V13.0004Z"
                          stroke="#00FF80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9 12L11 14L15 10" stroke="#00FF80" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg></div>
                    <div class="p1-badge-text">License</div>
                    <div class="p1-license-number">№39426</div>
                  </div>
                </div>
                <div class="p1-contact-info">
                  <div class="p1-contact-item">
                    <div class="p1-contact-icon"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16.3914 2.33333C18.7694 2.5839 20.9906 3.6386 22.6878 5.32301C24.3849 7.00742 25.4563 9.22065 25.7248 11.5967M16.3914 7C17.5389 7.22626 18.5918 7.7922 19.4136 8.62436C20.2353 9.45652 20.788 10.5165 20.9998 11.6667M25.6666 19.7401V23.2401C25.6679 23.565 25.6014 23.8866 25.4712 24.1844C25.341 24.4821 25.1501 24.7493 24.9107 24.969C24.6713 25.1886 24.3886 25.3558 24.0808 25.4599C23.773 25.564 23.4469 25.6027 23.1233 25.5734C19.5332 25.1834 16.0848 23.9566 13.0549 21.9918C10.2361 20.2006 7.84615 17.8106 6.05492 14.9918C4.08323 11.9482 2.85621 8.48294 2.47326 4.87678C2.4441 4.55416 2.48244 4.229 2.58584 3.92201C2.68924 3.61502 2.85542 3.33292 3.07382 3.09367C3.29221 2.85442 3.55803 2.66327 3.85434 2.53239C4.15066 2.4015 4.47099 2.33375 4.79492 2.33345H8.29492C8.86111 2.32787 9.41001 2.52837 9.83931 2.89757C10.2686 3.26676 10.549 3.77947 10.6283 4.34011C10.776 5.46019 11.0499 6.55996 11.4449 7.61845C11.6019 8.03602 11.6359 8.48985 11.5428 8.92614C11.4498 9.36243 11.2336 9.76291 10.9199 10.0801L9.43826 11.5618C11.0991 14.4826 13.5175 16.901 16.4383 18.5618L17.9199 17.0801C18.2371 16.7664 18.6376 16.5503 19.0739 16.4572C19.5102 16.3642 19.964 16.3981 20.3816 16.5551C21.4401 16.9501 22.5398 17.2241 23.6599 17.3718C24.2266 17.4517 24.7442 17.7372 25.1142 18.1739C25.4842 18.6105 25.6808 19.168 25.6666 19.7401Z"
                          stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg></div>
                    <div class="p1-contact-text">{{agent_phone}}</div>
                  </div>
                  <div class="p1-contact-item">
                    <div class="p1-contact-icon"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M25.6667 8.16667L15.2017 14.8167C14.8415 15.0423 14.425 15.162 14 15.162C13.575 15.162 13.1585 15.0423 12.7983 14.8167L2.33333 8.16667M4.66667 4.66667H23.3333C24.622 4.66667 25.6667 5.71134 25.6667 7V21C25.6667 22.2887 24.622 23.3333 23.3333 23.3333H4.66667C3.378 23.3333 2.33333 22.2887 2.33333 21V7C2.33333 5.71134 3.378 4.66667 4.66667 4.66667Z"
                          stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg></div>
                    <div class="p1-contact-text">{{agent_email}}</div>
                  </div>
                  <div class="p1-contact-item">
                    <div class="p1-contact-icon"><svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M25.6667 14C25.6667 20.4433 20.4433 25.6667 14 25.6667M25.6667 14C25.6667 7.55668 20.4433 2.33333 14 2.33333M25.6667 14H2.33333M14 25.6667C7.55668 25.6667 2.33333 20.4433 2.33333 14M14 25.6667C11.0043 22.5212 9.33333 18.3438 9.33333 14C9.33333 9.6562 11.0043 5.47885 14 2.33333M14 25.6667C16.9957 22.5212 18.6667 18.3438 18.6667 14C18.6667 9.6562 16.9957 5.47885 14 2.33333M2.33333 14C2.33333 7.55668 7.55668 2.33333 14 2.33333"
                          stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg></div>
                    <div class="p1-contact-text">{{agent_website}}</div>
                  </div>
                </div>
                <div class="p1-languages-section">
                  <div class="p1-languages-title">Languages</div>
                  <div class="p1-language-badges">
                    <div class="p1-language-badge">English</div>
                    <div class="p1-language-badge">Russian</div>
                    <div class="p1-language-badge">Spanish</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

// Page 2 Template
window.PDF_TEMPLATES.page2 = `<div style="width: 297mm; height: 210mm; overflow: hidden; background: #ffffff;">
  <style>
    .p2-body {
      font-family: 'Inter', sans-serif;
      background: #ffffff;
      color: #201e1b;
      line-height: 1.2;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    .p2-project-container {
      display: flex;
      flex-direction: row;
      gap: 40px;
      align-items: stretch;
      justify-content: flex-start;
      padding: 40px;
      height: 100%;
      width: 100%;
    }

    .p2-left-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      height: 100%;
    }

    .p2-about-header {
      width: 100%;
      margin-bottom: 20px;
    }

    .p2-about-text {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 18px;
      color: #8a8a8d;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .p2-project-info {
      display: flex;
      flex-direction: column;
      gap: 24px;
      width: 100%;
    }

    .p2-project-title-section {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .p2-project-title {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 48px;
      color: #201e1b;
    }

    .p2-info-row {
      display: flex;
      flex-direction: row;
      gap: 24px;
      align-items: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .p2-info-item {
      display: flex;
      flex-direction: row;
      gap: 14px;
      align-items: center;
    }

    .p2-developer-logo {
      width: 52px;
      height: 52px;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #f0f0f4;
    }

    .p2-developer-logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .p2-district-logo {
      width: 52px;
      height: 52px;
      border-radius: 12px;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #f0f0f4;
    }

    .p2-district-logo svg {
      transform: scale(0.75);
    }

    .p2-info-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
      justify-content: center;
    }

    .p2-info-label {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 18px;
      color: #8a8a8d;
    }

    .p2-info-value {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 22px;
      color: #201e1b;
    }

    .p2-timeline-section {
      width: 100%;
      border: 1px solid #f0f0f4;
      border-radius: 20px;
      overflow: hidden;
    }

    .p2-timeline-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 16px 30px;
      width: 100%;
    }

    .p2-timeline-item {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      justify-content: center;
    }

    .p2-timeline-icon {
      width: 52px;
      height: 52px;
      border-radius: 12px;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
    }

    .p2-timeline-icon svg {
      transform: scale(0.8);
    }

    .p2-timeline-icon.start {
      border: 1px solid #201e1b;
    }

    .p2-timeline-icon.end {
      border: 1px solid #f0f0f4;
    }

    .p2-timeline-info {
      display: flex;
      flex-direction: column;
      gap: 3px;
      align-items: center;
      text-align: center;
    }

    .p2-timeline-date {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 18px;
      color: #201e1b;
    }

    .p2-timeline-label {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 18px;
      color: #8a8a8d;
    }

    .p2-timeline-progress {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
    }

    .p2-progress-line {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: auto;
      width: 100%;
    }

    .p2-progress-line-full {
      flex: 1;
      height: 2px;
      background: #201e1b;
    }

    .p2-progress-dot {
      width: 10px;
      height: 10px;
      background: #201e1b;
      border-radius: 10px;
      flex-shrink: 0;
    }

    .p2-progress-line-partial {
      flex: 1;
      height: 2px;
      background: #8a8a8d;
    }

    .p2-progress-text {
      max-width: 250px;
      text-align: center;
    }

    .p2-progress-text p {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 16px;
      color: #201e1b;
    }

    .p2-pricing-table {
      width: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 20px;
      overflow: hidden;
      flex-grow: 1;
    }

    .p2-table-header {
      display: flex;
      flex-direction: row;
      gap: 4px;
      background: #f8f8f8;
      border: 1px solid #f0f0f4;
      border-bottom: 0;
      border-radius: 20px 20px 0 0;
      padding: 14px 20px;
    }

    .p2-header-cell {
      flex: 1;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 18px;
      color: #8a8a8d;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .p2-table-body {
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: #ffffff;
      border: 1px solid #f0f0f4;
      border-top: 0;
      border-radius: 0 0 20px 20px;
      padding: 20px;
    }

    .p2-table-row {
      display: flex;
      flex-direction: row;
      gap: 4px;
      align-items: center;
    }

    .p2-table-row.gray .p2-table-cell {
      color: #8a8a8d;
    }

    .p2-table-cell {
      flex: 1;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 18px;
      color: #201e1b;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .p2-right-content {
      flex: 0 0 auto;
      width: 45%;
      max-height: 100%;
    }

    .p2-project-image {
      width: 100%;
      height: 100%;
      border-radius: 24px;
      overflow: hidden;
    }

    .p2-project-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  </style>
  <div class="p2-body">
    <div class="p2-project-container">
      <div class="p2-left-content">
        <div class="p2-about-header">
          <p class="p2-about-text">About the project</p>
        </div>
        <div class="p2-project-info">
          <div class="p2-project-title-section">
            <h1 class="p2-project-title">{{project_title_p2}}</h1>
            <div class="p2-info-row">
              <div class="p2-info-item">
                <div class="p2-developer-logo"><img src="{{developer_logo}}" alt="Damac Properties" /></div>
                <div class="p2-info-text">
                  <div class="p2-info-label">Developer</div>
                  <div class="p2-info-value">{{developer_name}}</div>
                </div>
              </div>
              <div class="p2-info-item">
                <div class="p2-district-logo"><svg width="72" height="72" viewBox="0 0 73 73" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="70.0261" height="70.0261" rx="15" fill="white" stroke="#F0F0F4"
                      stroke-width="2" />
                    <path
                      d="M24.6549 48.2982C22.3835 46.868 18 46.5789 18 46.5789C18 46.5789 20.8872 41.8056 20.7113 38.4737C20.5591 35.5921 18 31.5965 18 31.5965V25.7018H31.3099H41.662L46 20L55 24.5L52.5 29.5L55 35L49.0563 37.2456C49.0563 37.2456 51.0546 41.125 50.5352 43.6316C50.0974 45.7444 49.4996 47.3179 47.5775 48.2982C45.8625 49.1729 44.5049 48.8057 42.6479 48.2982C40.9448 47.8329 40.4561 46.3072 38.7042 46.0877C35.499 45.6862 35.2024 50.2984 32.0493 51C30.358 51.3763 29.2152 51.6585 27.6127 51C26.1657 50.4054 25.9788 49.1318 24.6549 48.2982Z"
                      fill="white" stroke="#201E1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg></div>
                <div class="p2-info-text">
                  <div class="p2-info-label">District</div>
                  <div class="p2-info-value">{{district_name}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="p2-timeline-section">
            <div class="p2-timeline-container">
              <div class="p2-timeline-item">
                <div class="p2-timeline-icon start"><svg width="29" height="29" viewBox="0 0 25 27" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M7.20262 0.900323C7.20262 1.39756 7.60571 1.80065 8.10294 1.80065L15.3056 1.80065C15.8028 1.80065 16.2059 1.39756 16.2059 0.900321C16.2059 0.403085 15.8028 -5.2588e-06 15.3056 -5.17186e-06L8.10294 -3.91251e-06C7.6057 -3.82557e-06 7.20262 0.403086 7.20262 0.900323Z"
                      fill="#201E1B" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M19.4707 7.83924C19.1191 7.48764 19.1191 6.91758 19.4707 6.56598L21.2713 4.76533C21.6229 4.41373 22.193 4.41373 22.5446 4.76533C22.8962 5.11693 22.8962 5.68698 22.5446 6.03858L20.7439 7.83924C20.3923 8.19084 19.8223 8.19084 19.4707 7.83924Z"
                      fill="#201E1B" />
                    <path
                      d="M11.7041 3.00109C18.1651 3.00109 23.4081 8.24425 23.4082 14.7052C23.4082 21.1662 18.1651 26.4093 11.7041 26.4093C5.24317 26.4092 8.60373e-07 21.1661 8.60373e-07 14.7052C8.04309e-05 8.2443 5.24322 3.00117 11.7041 3.00109ZM11.7041 7.80284C11.2069 7.80292 10.8037 8.20605 10.8037 8.70323V14.7052C10.8037 15.2024 11.2069 15.6055 11.7041 15.6056C12.2013 15.6056 12.6045 15.2024 12.6045 14.7052V8.70323C12.6045 8.206 12.2013 7.80284 11.7041 7.80284Z"
                      fill="#201E1B" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M24.3452 6.6388C23.9936 6.9904 23.4236 6.9904 23.072 6.6388L20.6711 4.23793C20.3195 3.88633 20.3195 3.31628 20.6711 2.96468C21.0227 2.61308 21.5928 2.61308 21.9444 2.96468L24.3452 5.36555C24.6968 5.71715 24.6968 6.2872 24.3452 6.6388Z"
                      fill="#201E1B" />
                  </svg></div>
                <div class="p2-timeline-info">
                  <div class="p2-timeline-date">{{timeline_start_date}}</div>
                  <div class="p2-timeline-label">Building start</div>
                </div>
              </div>
              <div class="p2-timeline-progress">
                <div class="p2-progress-line">
                  <div class="p2-progress-line-full"></div>
                  <div class="p2-progress-dot"></div>
                  <div class="p2-progress-line-partial"></div>
                </div>
                <div class="p2-progress-text">
                  <p>{{timeline_progress_text}}</p>
                </div>
              </div>
              <div class="p2-timeline-item">
                <div class="p2-timeline-icon end"><svg width="29" height="29" viewBox="0 0 25 27" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M7.20262 0.900323C7.20262 1.39756 7.60571 1.80065 8.10295 1.80065L15.3056 1.80065C15.8028 1.80065 16.2059 1.39756 16.2059 0.900321C16.2059 0.403085 15.8028 -5.2588e-06 15.3056 -5.17186e-06L8.10295 -3.91251e-06C7.60571 -3.82557e-06 7.20262 0.403086 7.20262 0.900323Z"
                      fill="#201E1B" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M19.4707 7.83924C19.1191 7.48764 19.1191 6.91758 19.4707 6.56598L21.2713 4.76533C21.6229 4.41373 22.193 4.41373 22.5446 4.76533C22.8962 5.11693 22.8962 5.68698 22.5446 6.03858L20.7439 7.83924C20.3923 8.19084 19.8223 8.19084 19.4707 7.83924Z"
                      fill="#201E1B" />
                    <path
                      d="M11.7041 3.00109C18.1651 3.00109 23.4081 8.24425 23.4082 14.7052C23.4082 21.1662 18.1651 26.4093 11.7041 26.4093C5.24317 26.4092 3.91878e-06 21.1661 3.91878e-06 14.7052C8.34893e-05 8.2443 5.24322 3.00117 11.7041 3.00109ZM11.7041 7.80284C11.2069 7.80293 10.8037 8.20605 10.8037 8.70323V14.7052C10.8037 15.2024 11.2069 15.6055 11.7041 15.6056C12.2013 15.6056 12.6045 15.2024 12.6045 14.7052V8.70323C12.6045 8.206 12.2013 7.80284 11.7041 7.80284Z"
                      fill="#201E1B" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M24.3452 6.6388C23.9936 6.9904 23.4236 6.9904 23.072 6.6388L20.6711 4.23793C20.3195 3.88633 20.3195 3.31628 20.6711 2.96468C21.0227 2.61308 21.5928 2.61308 21.9444 2.96468L24.3452 5.36555C24.6968 5.71715 24.6968 6.2872 24.3452 6.6388Z"
                      fill="#201E1B" />
                  </svg></div>
                <div class="p2-timeline-info">
                  <div class="p2-timeline-date">{{timeline_end_date}}</div>
                  <div class="p2-timeline-label">Handover</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p2-pricing-table">
          <div class="p2-table-header">
            <div class="p2-header-cell">Unit type</div>
            <div class="p2-header-cell">Bedrooms</div>
            <div class="p2-header-cell">Amount</div>
            <div class="p2-header-cell">Area, sqft</div>
            <div class="p2-header-cell">Price from</div>
          </div>
          <div class="p2-table-body">
            <div class="p2-table-row gray">
              <div class="p2-table-cell">Apartments</div>
              <div class="p2-table-cell">Studio</div>
              <div class="p2-table-cell">0/108</div>
              <div class="p2-table-cell">952 - 1084</div>
              <div class="p2-table-cell">1 218 000 AED</div>
            </div>
            <div class="p2-table-row">
              <div class="p2-table-cell">Apartments</div>
              <div class="p2-table-cell">1 Bedroom</div>
              <div class="p2-table-cell">16/86</div>
              <div class="p2-table-cell">952 - 1084</div>
              <div class="p2-table-cell">1 497 000 AED</div>
            </div>
            <div class="p2-table-row">
              <div class="p2-table-cell">Apartments</div>
              <div class="p2-table-cell">2 Bedroom</div>
              <div class="p2-table-cell">4/42</div>
              <div class="p2-table-cell">952 - 1084</div>
              <div class="p2-table-cell">2 389 000 AED</div>
            </div>
          </div>
        </div>
      </div>
      <div class="p2-right-content">
        <div class="p2-project-image">
          <img src="{{project_image_p2}}" alt="ELO 2 Damac Hills Building" />
        </div>
      </div>
    </div>
  </div>
</div>`;

// Page 3 Template
window.PDF_TEMPLATES.page3 = `<div style="width: 297mm; height: 210mm; overflow: hidden; background: #ffffff;">
  <style>
    .p3-body {
      font-family: 'Inter', sans-serif;
      background: #ffffff;
      color: #201e1b;
      line-height: 1.2;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    .p3-project-page {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: flex-start;
      gap: 43px;
      width: 100%;
      height: 100%;
      padding: 40px;
    }

    .p3-building-section {
      flex: 0 0 45%;
      height: 100%;
    }

    .p3-building-image {
      width: 100%;
      height: 100%;
      border-radius: 24px;
      background-image: url('{{building_image_p3}}');
      background-size: cover;
      background-position: center;
    }

    .p3-content-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 40px;
      height: 100%;
      align-items: flex-start;
      justify-content: flex-start;
      min-width: 0;
    }

    .p3-page-header {
      display: flex;
      flex-direction: row;
      gap: 10px;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
      flex-wrap: wrap;
    }

    .p3-about-text {
      flex: 1;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 18px;
      color: #8a8a8d;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      line-height: 1;
      min-width: 0;
    }

    .p3-luxury-logo {
      position: relative;
      width: 200px;
      height: 65px;
      flex-shrink: 0;
    }

    .p3-logo-circles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .p3-circle-group {
      position: absolute;
      top: -23px;
      left: 0px;
      transform: rotate(180deg) scale(0.7);
    }

    .p3-small-circle {
      position: absolute;
      top: 21px;
      left: 1px;
      transform: rotate(180deg) scale(0.7);
    }

    .p3-tiny-circle {
      position: absolute;
      top: -1.5px;
      left: 23px;
      transform: rotate(180deg) scale(0.7);
    }

    .p3-logo-text {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .p3-luxury-text {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 36px;
      line-height: 1;
      color: #efd577;
      text-align: center;
      white-space: nowrap;
    }

    .p3-real-estate-text {
      font-family: 'Inter', sans-serif;
      font-weight: 300;
      font-size: 11px;
      letter-spacing: 1px;
      color: #efd577;
      text-align: center;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .p3-project-title-section {
      display: flex;
      flex-direction: column;
      gap: 24px;
      width: 100%;
    }

    .p3-project-title {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 48px;
      color: #201e1b;
      line-height: 1;
      margin: 0;
    }

    .p3-developer-section {
      width: 100%;
    }

    .p3-developer-info {
      display: flex;
      flex-direction: row;
      gap: 16px;
      align-items: center;
    }

    .p3-developer-logo {
      width: 60px;
      height: 60px;
      border-radius: 16px;
      overflow: hidden;
      background: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #f0f0f4;
      flex-shrink: 0;
    }

    .p3-developer-logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .p3-developer-text {
      display: flex;
      flex-direction: column;
      gap: 3px;
      justify-content: center;
    }

    .p3-developer-label {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 20px;
      color: #8a8a8d;
      line-height: 1;
    }

    .p3-developer-name {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 26px;
      color: #201e1b;
      line-height: 1.3;
    }

    .p3-description-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      overflow: hidden;
      flex-grow: 1;
    }

    .p3-description-label {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 20px;
      color: #8a8a8d;
      line-height: 1;
      flex-shrink: 0;
    }

    .p3-description-text {
      width: 100%;
      overflow: hidden;
    }

    .p3-description-text p {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 20px;
      color: #201e1b;
      line-height: 1.5;
      margin: 0;
    }
  </style>
  <div class="p3-body">
    <div class="p3-project-page">
      <div class="p3-building-section">
        <div class="p3-building-image"></div>
      </div>
      <div class="p3-content-section">
        <div class="p3-page-header">
          <div class="p3-about-text">About the project</div>
          <div class="p3-luxury-logo">
            <div class="p3-logo-circles">
              <div class="p3-circle-group"><svg width="117" height="57" viewBox="0 0 117 57" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle cx="28.2494" cy="28.2494" r="28.2494" fill="#EFD577" />
                  <circle cx="88.2073" cy="28.2494" r="28.2494" fill="#EFD577" />
                </svg></div>
              <div class="p3-small-circle"><svg width="57" height="57" viewBox="0 0 57 57" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle cx="28.2494" cy="28.2494" r="28.2494" fill="#EFD577" />
                </svg></div>
              <div class="p3-tiny-circle"><svg width="29" height="29" viewBox="0 0 29 29" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="14.1186" cy="14.1186" rx="14.1186" ry="14.1186" fill="#EFD577" />
                </svg></div>
            </div>
            <div class="p3-logo-text">
              <div class="p3-luxury-text">luxury</div>
              <div class="p3-real-estate-text">real estate</div>
            </div>
          </div>
        </div>
        <div class="p3-project-title-section">
          <h1 class="p3-project-title">{{project_title_p3}}</h1>
          <div class="p3-developer-section">
            <div class="p3-developer-info">
              <div class="p3-developer-logo">
                <img src="{{developer_logo_p3}}" alt="Damac Properties" />
              </div>
              <div class="p3-developer-text">
                <div class="p3-developer-label">Developer</div>
                <div class="p3-developer-name">{{developer_name_p3}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="p3-description-section">
          <div class="p3-description-label">Description</div>
          <div class="p3-description-text">
            <p>{{description_text}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

// Page 4 Template
window.PDF_TEMPLATES.page4 = `<div style="width: 297mm; height: 210mm; overflow: hidden; background: #ffffff; padding: 40px;">
  <style>
    .p4-body {
      font-family: 'Inter', sans-serif;
      background: #ffffff;
      color: #201e1b;
      line-height: 1.2;
      width: 100%;
      height: 100%;
    }

    .p4-units-container {
      display: flex;
      flex-direction: row;
      gap: 40px;
      align-items: stretch;
      justify-content: flex-start;
      width: 100%;
      height: 100%;
    }

    .p4-left-panel {
      flex: 0 0 400px;
      background: #f8f8f8;
      border: 1px solid #f0f0f4;
      border-radius: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 40px;
    }

    .p4-units-title {
      font-weight: 600;
      font-size: 56px;
      color: #201e1b;
    }

    .p4-units-info {}

    .p4-units-label {
      font-size: 20px;
      color: #8a8a8d;
      margin-bottom: 16px;
    }

    .p4-units-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .p4-unit-item {
      font-weight: 600;
      font-size: 24px;
      color: #201e1b;
    }

    .p4-right-content {
      flex: 1;
      display: flex;
      gap: 40px;
    }

    .p4-villa-card {
      flex: 1;
      display: flex;
      flex-direction: column;
      border: 2px solid #f0f0f4;
      border-radius: 24px;
      overflow: hidden;
    }

    .p4-villa-image {
      width: 100%;
      flex-grow: 1;
      background-size: cover;
      background-position: center;
    }

    .p4-villa-details {
      padding: 20px;
    }

    .p4-villa-title {
      font-weight: 600;
      font-size: 24px;
      margin-bottom: 16px;
    }

    .p4-price-section,
    .p4-rate-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 18px;
    }

    .p4-price-row,
    .p4-area-row,
    .p4-rate-row {
      display: flex;
      justify-content: space-between;
    }

    .p4-price-label,
    .p4-area-label,
    .p4-rate-label {
      color: #8a8a8d;
    }
  </style>
  <div class="p4-body">
    <div class="p4-units-container">
      <div class="p4-left-panel">
        <div>
          <h1 class="p4-units-title">Typical Units</h1>
        </div>
        <div class="p4-units-info">
          <div class="p4-units-label">Number of units</div>
          <div class="p4-units-list">
            <div class="p4-unit-item">STUDIO - {{unit_studio_count}}</div>
            <div class="p4-unit-item">1 BEDROOM - {{unit_1_bed_count}}</div>
            <div class="p4-unit-item">2 BEDROOM - {{unit_2_bed_count}}</div>
          </div>
        </div>
      </div>
      <div class="p4-right-content">
        <div class="p4-villa-card">
          <div class="p4-villa-image" style="background-image: url('{{villa_4_bed_image}}')"></div>
          <div class="p4-villa-details">
            <h2 class="p4-villa-title">Villa: 4 Bedroom</h2>
            <div class="p4-price-section">
              <div class="p4-price-row"><span>from <b>{{villa_4_bed_price_from}}</b></span><span>to
                  <b>{{villa_4_bed_price_to}}</b></span></div>
              <div class="p4-area-row"><span>from <b>{{villa_4_bed_area_from}}</b></span><span>to
                  <b>{{villa_4_bed_area_to}}</b></span></div>
            </div>
            <hr style="margin: 20px 0; border-color: #f0f0f4;">
            <div class="p4-rate-section">
              <div class="p4-rate-row"><span>from <b>{{villa_4_bed_rate_from}}</b></span><span>to
                  <b>{{villa_4_bed_rate_to}}</b></span></div>
            </div>
          </div>
        </div>
        <div class="p4-villa-card">
          <div class="p4-villa-image" style="background-image: url('{{villa_5_bed_image}}')"></div>
          <div class="p4-villa-details">
            <h2 class="p4-villa-title">Villa: 5 Bedroom</h2>
            <div class="p4-price-section">
              <div class="p4-price-row"><span>from <b>{{villa_5_bed_price_from}}</b></span><span>to
                  <b>{{villa_5_bed_price_to}}</b></span></div>
              <div class="p4-area-row"><span>from <b>{{villa_5_bed_area_from}}</b></span><span>to
                  <b>{{villa_5_bed_area_to}}</b></span></div>
            </div>
            <hr style="margin: 20px 0; border-color: #f0f0f4;">
            <div class="p4-rate-section">
              <div class="p4-rate-row"><span>from <b>{{villa_5_bed_rate_from}}</b></span><span>to
                  <b>{{villa_5_bed_rate_to}}</b></span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

// Page 5 Template
window.PDF_TEMPLATES.page5 = `<div
  style="width: 297mm; height: 210mm; overflow: hidden; background: #ffffff; padding: 40px; display: flex; justify-content: center; align-items: center;">
  <style>
    .p5-body {
      font-family: 'Inter', sans-serif;
      color: #201e1b;
      width: 100%;
      height: 100%;
      display: flex;
      gap: 40px;
    }

    .p5-left-column {
      flex: 0 0 300px;
      background-color: #f9fafb;
      border-radius: 16px;
      padding: 30px;
      display: flex;
      flex-direction: column;
    }

    .p5-right-column {
      flex: 1;
    }

    .p5-option-title {
      font-size: 16px;
      color: #6b7280;
      margin-bottom: 8px;
    }

    .p5-plan-title {
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 40px;
    }

    .p5-all-options {
      font-size: 16px;
      color: #6b7280;
      margin-top: auto;
      margin-bottom: 16px;
    }

    .p5-option-item {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 18px;
      padding: 12px;
      border-radius: 8px;
      background-color: #ffffff;
      margin-bottom: 10px;
    }

    .p5-total-price-section {
      background-color: #f9fafb;
      padding: 30px;
      border-radius: 16px;
      margin-bottom: 20px;
    }

    .p5-total-price {
      font-size: 28px;
      font-weight: 600;
    }

    .p5-price-subtitle {
      font-size: 14px;
      color: #6b7280;
    }

    .p5-payment-breakdown {
      font-size: 16px;
    }

    .p5-payment-category {
      font-weight: 600;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .p5-payment-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .p5-payment-row:last-child {
      border-bottom: none;
    }

    .p5-payment-details {
      display: flex;
      gap: 10px;
    }
  </style>
  <div class="p5-body">
    <div class="p5-left-column">
      <div class="p5-option-title">Payment Plan Option</div>
      <div class="p5-plan-title">3 Years Post Handover Payment Plan</div>
      <div class="p5-all-options">All options</div>
      <div class="p5-option-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
            stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>3 Years Post Handover</span>
      </div>
      <div class="p5-option-item">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
            stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>30/70 Payment Plan</span>
      </div>
    </div>
    <div class="p5-right-column">
      <div class="p5-total-price-section">
        <div class="p5-total-price">Total price: {{total_price}}</div>
        <div class="p5-price-subtitle">The minimum price per unit in the project is taken as an example.</div>
      </div>
      <div class="p5-payment-breakdown">
        <div class="p5-payment-category">Down Payment <span style="font-size: 14px; color: #6b7280;">1
            payment</span></div>
        <div class="p5-payment-row">
          <span>On Booking</span>
          <div class="p5-payment-details">
            <span>10%</span>
            <span>{{on_booking_value}}</span>
          </div>
        </div>
        <div class="p5-payment-row">
          <span>Administrative fee</span>
          <span>{{admin_fee_value}}</span>
        </div>
        <div class="p5-payment-row">
          <span>DLD Fee</span>
          <div class="p5-payment-details">
            <span>{{dld_fee_percent}}</span>
            <span>{{dld_fee_value}}</span>
          </div>
        </div>
        <div class="p5-payment-category">During construction <span style="font-size: 14px; color: #6b7280;">1
            payment</span></div>
        <div class="p5-payment-row">
          <span></span>
          <div class="p5-payment-details">
            <span>{{during_construction_percent}}</span>
            <span>{{during_construction_value}}</span>
          </div>
        </div>
        <div class="p5-payment-category">On Handover <span style="font-size: 14px; color: #6b7280;">1 payment</span>
        </div>
        <div class="p5-payment-row">
          <span></span>
          <div class="p5-payment-details">
            <span>{{on_handover_percent}}</span>
            <span>{{on_handover_value}}</span>
          </div>
        </div>
        <div class="p5-payment-category">Post Handover <span style="font-size: 14px; color: #6b7280;">1
            payment</span></div>
        <div class="p5-payment-row">
          <span></span>
          <div class="p5-payment-details">
            <span>{{post_handover_percent}}</span>
            <span>{{post_handover_value}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

// Page 6 Template
window.PDF_TEMPLATES.page6 = `<div
  style="width: 297mm; height: 210mm; overflow: hidden; background-image: url('{{full_image_p6}}'); background-size: cover; background-position: center;">
</div>`;

// Page 7 Template
window.PDF_TEMPLATES.page7 = `<div style="width: 297mm; height: 210mm; overflow: hidden; display: flex; gap: 10px; padding: 10px; background: #fff;">
  <div
    style="flex: 1; background-image: url('{{collage2_image1_p7}}'); background-size: cover; background-position: center; border-radius: 16px;">
  </div>
  <div
    style="flex: 1; background-image: url('{{collage2_image2_p7}}'); background-size: cover; background-position: center; border-radius: 16px;">
  </div>
</div>`;

// Page 8 Template
window.PDF_TEMPLATES.page8 = `<div
  style="width: 297mm; height: 210mm; overflow: hidden; background-image: url('{{full_image_p8}}'); background-size: cover; background-position: center;">
</div>`;

// Page 9 Template
window.PDF_TEMPLATES.page9 = `<div style="width: 297mm; height: 210mm; overflow: hidden; display: flex; gap: 10px; padding: 10px; background: #fff;">
  <div
    style="flex: 1.5; background-image: url('{{collage3_image1_p9}}'); background-size: cover; background-position: center; border-radius: 16px;">
  </div>
  <div style="flex: 1; display: flex; flex-direction: column; gap: 10px;">
    <div
      style="flex: 1; background-image: url('{{collage3_image2_p9}}'); background-size: cover; background-position: center; border-radius: 16px;">
    </div>
    <div
      style="flex: 1; background-image: url('{{collage3_image3_p9}}'); background-size: cover; background-position: center; border-radius: 16px;">
    </div>
  </div>
</div>`;

// Page 10 Template
window.PDF_TEMPLATES.page10 = `<div
  style="width: 297mm; height: 210mm; overflow: hidden; background-image: url('{{full_image_p10}}'); background-size: cover; background-position: center;">
</div>`;

// Page 11 Template
window.PDF_TEMPLATES.page11 = `<div style="width: 297mm; height: 210mm; overflow: hidden; background: #ffffff; padding: 40px;">
  <style>
    .p11-body {
      font-family: 'Inter', sans-serif;
      background: #ffffff;
      color: #201e1b;
      line-height: 1.2;
      width: 100%;
      height: 100%;
    }

    .p11-developer-container {
      display: flex;
      flex-direction: row;
      gap: 40px;
      align-items: stretch;
      justify-content: flex-start;
      width: 100%;
      height: 100%;
    }

    .p11-left-panel {
      flex: 0 0 400px;
      background: #f8f8f8;
      border: 1px solid #f0f0f4;
      border-radius: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 40px;
    }

    .p11-developer-title {
      font-weight: 600;
      font-size: 56px;
      color: #201e1b;
    }

    .p11-stats-section {
      display: flex;
      flex-direction: column;
      gap: 36px;
    }

    .p11-stat-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .p11-stat-number {
      font-weight: 600;
      font-size: 40px;
    }

    .p11-stat-label {
      font-size: 20px;
      color: #8a8a8d;
    }

    .p11-right-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 40px;
    }

    .p11-company-image-section {
      flex: 1;
      border-radius: 24px;
      overflow: hidden;
      position: relative;
    }

    .p11-company-image {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-image: url('{{dev_company_image}}');
    }

    .p11-company-overlay {
      position: absolute;
      bottom: 30px;
      left: 30px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .p11-company-logo {
      width: 100px;
      height: 100px;
      border-radius: 20px;
      overflow: hidden;
      border: 3px solid #f0f0f4;
    }

    .p11-company-logo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .p11-company-name {
      font-weight: 700;
      font-size: 36px;
      color: #ffffff;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    .p11-description-section {
      flex: 1;
      background: #f8f8f8;
      border: 1px solid #f0f0f4;
      border-radius: 24px;
      padding: 40px;
    }

    .p11-description-content p {
      font-size: 18px;
      line-height: 1.5;
    }
  </style>
  <div class="p11-body">
    <div class="p11-developer-container">
      <div class="p11-left-panel">
        <h1 class="p11-developer-title">Developer</h1>
        <div class="p11-stats-section">
          <div class="p11-stat-item">
            <div class="p11-stat-number">{{dev_foundation_year}}</div>
            <div class="p11-stat-label">Year of foundation</div>
          </div>
          <div class="p11-stat-item">
            <div class="p11-stat-number">{{dev_projects_in_progress}}</div>
            <div class="p11-stat-label">Projects in construction stage</div>
          </div>
          <div class="p11-stat-item">
            <div class="p11-stat-number">{{dev_completed_projects}}</div>
            <div class="p11-stat-label">Completed projects</div>
          </div>
        </div>
      </div>
      <div class="p11-right-content">
        <div class="p11-company-image-section">
          <div class="p11-company-image">
            <div class="p11-company-overlay">
              <div class="p11-company-logo">
                <img src="{{dev_company_logo}}" alt="Developer Logo" />
              </div>
              <div class="p11-company-name">{{developer_name}}</div>
            </div>
          </div>
        </div>
        <div class="p11-description-section">
          <div class="p11-description-content">
            <p>{{dev_description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
