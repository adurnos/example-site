'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------ */
  /* Header shrink-on-scroll behavior                                    */
  /* ------------------------------------------------------------------ */

  var header = document.getElementById('siteHeader');

  if (header) {
    var scrollThreshold = 50;
    var headerTicking = false;

    var updateHeader = function () {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      headerTicking = false;
    };

    var onHeaderScroll = function () {
      if (!headerTicking) {
        window.requestAnimationFrame(updateHeader);
        headerTicking = true;
      }
    };

    window.addEventListener('scroll', onHeaderScroll, { passive: true });

    // Run once on load in case the page opens already scrolled (e.g. anchor link)
    updateHeader();
  }

  /* ------------------------------------------------------------------ */
  /* Google Reviews carousel — infinite loop in both directions          */
  /* ------------------------------------------------------------------ */

  var reviewsData = [
    {
      initials: 'MC',
      name: 'Marie Coleman',
      text: 'Called about a leak early on a Sunday and someone was at our door within the hour. Straightforward about pricing the whole time and cleaned up before leaving. Would call again without hesitation.'
    },
    {
      initials: 'DR',
      name: 'David Reyes',
      text: 'We have used [Business Name] for years and the quality has never slipped. Fair quotes, on-time arrivals, and work that holds up. Exactly what you want from a local plumbing company.'
    },
    {
      initials: 'JT',
      name: 'James Turner',
      text: 'Our water heater died on a Friday night and they had a new one installed by Saturday afternoon. Reasonable price and no upselling.'
    },
    {
      initials: 'SP',
      name: 'Sarah Patel',
      text: 'Our drain was backing up into the shower and they cleared it the same day. They explained what caused it and how to keep it from happening again.'
    },
    {
      initials: 'RK',
      name: 'Robert Kim',
      text: 'Repiped half our house after an inspection flagged old galvanized pipes. Clean work, respectful of our home, and finished on schedule.'
    },
    {
      initials: 'AL',
      name: 'Angela Lopez',
      text: 'Second time using [Business Name] and just as impressed as the first. Punctual, upfront about cost, and the work has held up perfectly.'
    }
  ];

  var reviewsGrid = document.getElementById('reviewsGrid');
  var prevBtn = document.getElementById('reviewPrevBtn');
  var nextBtn = document.getElementById('reviewNextBtn');

  if (reviewsGrid && prevBtn && nextBtn && reviewsData.length > 0) {
    var currentIndex = 0;
    var mobileQuery = window.matchMedia('(max-width: 768px)');

    var getVisibleCount = function () {
      return mobileQuery.matches ? 1 : 2;
    };

    var buildReviewCard = function (review) {
      var card = document.createElement('div');
      card.className = 'review-card';

      var text = document.createElement('p');
      text.className = 'review-text';
      text.textContent = review.text;

      var reviewer = document.createElement('div');
      reviewer.className = 'reviewer';

      var avatar = document.createElement('div');
      avatar.className = 'reviewer-avatar';
      avatar.textContent = review.initials;

      var info = document.createElement('div');
      info.className = 'reviewer-info';

      var name = document.createElement('p');
      name.className = 'reviewer-name';
      name.textContent = review.name;

      var meta = document.createElement('p');
      meta.className = 'reviewer-meta';
      meta.textContent = 'Verified Google Review';

      info.appendChild(name);
      info.appendChild(meta);
      reviewer.appendChild(avatar);
      reviewer.appendChild(info);
      card.appendChild(text);
      card.appendChild(reviewer);

      return card;
    };

    var renderReviews = function () {
      var visibleCount = getVisibleCount();
      reviewsGrid.innerHTML = '';

      for (var i = 0; i < visibleCount; i++) {
        var reviewIndex = (currentIndex + i) % reviewsData.length;
        reviewsGrid.appendChild(buildReviewCard(reviewsData[reviewIndex]));
      }
    };

    var showNext = function () {
      currentIndex = (currentIndex + 1) % reviewsData.length;
      renderReviews();
    };

    var showPrev = function () {
      currentIndex = (currentIndex - 1 + reviewsData.length) % reviewsData.length;
      renderReviews();
    };

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', renderReviews);
    } else if (typeof mobileQuery.addListener === 'function') {
      mobileQuery.addListener(renderReviews);
    }

    renderReviews();
  }

  /* ------------------------------------------------------------------ */
  /* Scroll-triggered fade-in via IntersectionObserver                   */
  /* Re-triggers every time the element enters the viewport             */
  /* ------------------------------------------------------------------ */

  var fadeTargets = document.querySelectorAll('.js-fade-in');

  if (fadeTargets.length > 0) {
    if (!('IntersectionObserver' in window)) {
      fadeTargets.forEach(function (el) {
        el.classList.add('is-visible');
      });
    } else {
      fadeTargets.forEach(function (el) {
        el.classList.add('fade-in-ready');
      });

      var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    fadeTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  }
}

function fitHeroAndTrustBar() {
  var header = document.getElementById('siteHeader');
  var hero = document.querySelector('.hero');
  var trustBar = document.querySelector('.trust-bar');

  if (header && hero && trustBar) {
    var targetHeroHeight = window.innerHeight - header.offsetHeight - trustBar.offsetHeight;
    hero.style.minHeight = Math.max(targetHeroHeight, 420) + 'px';
  }
}

fitHeroAndTrustBar();
window.addEventListener('resize', fitHeroAndTrustBar);

});