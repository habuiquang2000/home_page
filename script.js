const translations = {
  EN: {
    shipTo: 'Ship to',
    deliverTo: 'Deliver to',
    searchPlaceholder: 'Find your favourite topics...',

    navTextHome: 'Home',
    allProduct: 'All product',
    navTextProducts: 'Customized Products',

    newArrival: 'New Arrival',
    bestSeller: 'Best Seller',
    products: 'Products',
    addToCart: 'Add to cart',

    // FOOTER CONTENT
    /** col-1 */
    phoneNumber: 'Phone number',
    needSupport: 'Need support',
    submitATicket: 'Submit a ticket',

    /** col-2 */
    info: 'Info',
    support: 'Support',
    contactUs: 'Contact us',
    orderTracking: 'Order tracking',
    FAQs: 'FAQs',
    DMCA: 'DMCA',

    /** col-3 */
    polices: 'Polices',
    privacyPolicy: 'Privacy policy',
    termsOfService: 'Terms of service',
    shippingPolicy: 'Shipping policy',
    returnPolicy: 'Return policy',
    refundPolicy: 'Refund policy',

    /** col-4 */
    weAccept: 'We Accept'
  },
  VN: {
    shipTo: 'Giao đến',
    searchPlaceholder: 'Tìm kiếm...',
    navTextHome: 'Trang chủ',
    navTextProducts: 'Sản phẩm tùy chỉnh',
    products: 'Sản phẩm',
    addToCart: 'Thêm vào giỏ hàng',

    // FOOTER CONTENT
    /** col-1 */
    phoneNumber: 'Số điện thoại',
    needSupport: 'Cần hỗ trợ',
    submitATicket: 'Gửi vé',

    /** col-2 */
    info: 'Thông tin',
    support: 'Hỗ trợ',
    contactUs: 'Liên hệ với chúng tôi',
    orderTracking: 'Theo dõi đơn hàng',
    FAQs: 'Câu hỏi thường gặp',
    DMCA: 'DMCA',

    /** col-3 */
    policys: 'Chính sách',
    privacyPolicy: 'Chính sách bảo mật',
    termsOfService: 'Điều khoản dịch vụ',
    shippingPolicy: 'Chính sách vận chuyển',
    returnPolicy: 'Chính sách trả hàng',
    refundPolicy: 'Chính sách hoàn tiền',

    /** col-4 */
    weAccept: 'Chúng tôi chấp nhận'
  }
};

const switchLanguage = lang => {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerText = translations[lang][key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', translations[lang][key]);
  });
  const languageSelector = document.querySelector('.language-selector');
  const dropdownToggle = languageSelector.querySelector('.dropdown-toggle');
  const dropdownMenu = languageSelector.querySelector('.dropdown-menu');
  const dropdownItems = dropdownMenu.querySelectorAll('li');
  const selectedFlag = document.querySelector(`[data-lang="${lang}"] img`).src;
  dropdownToggle.innerHTML = `<img src="${selectedFlag}" alt="Flag">`;

  dropdownItems.forEach(function (item) {
    if (item.getAttribute('data-lang') === lang) {
      item.classList.add('active');
    }
  });

  localStorage.setItem('language', lang);
};

const handleLanguage = () => {
  const languageSelector = document.querySelector('.language-selector');
  const dropdownToggle = languageSelector.querySelector('.dropdown-toggle');
  const dropdownMenu = languageSelector.querySelector('.dropdown-menu');
  const dropdownItems = dropdownMenu.querySelectorAll('li');

  dropdownToggle.addEventListener('click', function () {
    dropdownMenu.style.display =
      dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  dropdownItems.forEach(function (item) {
    item.addEventListener('click', function () {
      const selectedLang = this.getAttribute('data-lang');

      dropdownMenu.style.display = 'none';

      dropdownItems.forEach(function (el) {
        el.classList.remove('active');
      });
      this.classList.add('active');

      currentLanguage = selectedLang;

      switchLanguage(selectedLang);
    });
  });

  document.addEventListener('click', function (event) {
    if (!languageSelector.contains(event.target)) {
      dropdownMenu.style.display = 'none';
    }
  });
};

const handleSearch = () => {
  const searchInput = document.getElementById('search-input');
  const clearBtn = document.getElementById('clear-btn');

  searchInput.addEventListener('input', function () {
    if (searchInput.value.length > 0) {
      clearBtn.style.display = 'flex';
    } else {
      clearBtn.style.display = 'none';
    }
  });

  clearBtn.addEventListener('click', function () {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    searchInput.focus();
  });
};

const getLocation = async () => {
  const ipData = await fetch('https://speed.cloudflare.com/meta')
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
  const { clientIp } = ipData;
  const locationData = await fetch(`https://ip.cloudimgs.net/json/${clientIp}`)
    .then(res => res.json())
    .then(data => data);
  const locationText = document.getElementById('location-text');
  const { regionName, country, countryCode } = locationData;
  const selectedlang = localStorage.getItem('language');
  if (!selectedlang) {
    translations[countryCode]
      ? switchLanguage(countryCode)
      : switchLanguage('EN');
  } else {
    switchLanguage(selectedlang);
  }
  locationText.innerText = `${regionName}, ${country}`;
};

function runOnStart() {
  handleLanguage();
  handleSearch();
  getLocation();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runOnStart);
} else {
  runOnStart();
}

new Swiper('.hompage-swiper-container-new-arrival', {
  spaceBetween: 20,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: '.hompage-swiper-pagination-new-arrival',
    clickable: true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: '.hompage-swiper-button-next-new-arrival',
    prevEl: '.hompage-swiper-button-prev-new-arrival'
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    312.98: {
      slidesPerView: 2,
      spaceBetween: 8,
      grid: {
        fill: 'row',
        rows: 2
      }
    },
    991.98: { slidesPerView: 4 }
  }
});

new Swiper('.hompage-swiper-container-best-sell', {
  spaceBetween: 20,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: '.hompage-swiper-pagination-best-sell',
    clickable: true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: '.hompage-swiper-button-next-best-sell',
    prevEl: '.hompage-swiper-button-prev-best-sell'
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    312.98: {
      slidesPerView: 2,
      spaceBetween: 8,
      grid: {
        fill: 'row',
        rows: 2
      }
    },
    991.98: { slidesPerView: 4 }
  }
});

function toggleNav() {
  const sideNav = document.getElementById('menuBar');
  if (sideNav.style.left === '0px') {
    sideNav.style.left = '-280px'; // Đóng menu
  } else {
    sideNav.style.left = '0px'; // Mở menu
  }
}

document.getElementById('openMenuBar')?.addEventListener('click', toggleNav);
document.getElementById('closeMenuBar')?.addEventListener('click', toggleNav);
