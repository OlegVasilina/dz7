/* Практическая работа №7: адаптивная галерея изображений. */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var viewport = document.getElementById('gallery-viewport');
    var track = document.getElementById('gallery-track');
    var items = Array.prototype.slice.call(track.querySelectorAll('.gallery-item'));
    var previousButton = document.querySelector('.gallery-prev');
    var nextButton = document.querySelector('.gallery-next');
    var pageButtonsContainer = document.getElementById('gallery-page-buttons');
    var pageStatus = document.getElementById('gallery-page-status');
    var currentPage = 0;
    var visibleCount = 1;
    var pageCount = 1;

    function getVisibleCount() {
        return window.matchMedia('(min-width: 768px)').matches ? 3 : 1;
    }

    function buildPager() {
        pageButtonsContainer.textContent = '';
        var page;
        for (page = 0; page < pageCount; page += 1) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'gallery-page-button';
            button.textContent = String(page + 1);
            button.setAttribute('aria-label', 'Перейти на страницу ' + (page + 1));
            button.setAttribute('data-page', String(page));
            button.addEventListener('click', function () {
                currentPage = Number(this.getAttribute('data-page'));
                renderGallery();
            });
            pageButtonsContainer.appendChild(button);
        }
    }

    function renderGallery() {
        visibleCount = getVisibleCount();
        pageCount = Math.ceil(items.length / visibleCount);
        if (currentPage >= pageCount) {
            currentPage = pageCount - 1;
        }
        var itemWidth = viewport.clientWidth / visibleCount;
        track.style.transform = 'translateX(' + (-currentPage * visibleCount * itemWidth) + 'px)';
        previousButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === pageCount - 1;
        pageStatus.textContent = 'Страница ' + (currentPage + 1) + ' из ' + pageCount;

        var buttons = pageButtonsContainer.querySelectorAll('button');
        var index;
        for (index = 0; index < buttons.length; index += 1) {
            if (index === currentPage) {
                buttons[index].setAttribute('aria-current', 'page');
            } else {
                buttons[index].removeAttribute('aria-current');
            }
        }
    }

    function refreshGallery() {
        var newVisibleCount = getVisibleCount();
        var newPageCount = Math.ceil(items.length / newVisibleCount);
        if (newVisibleCount !== visibleCount || newPageCount !== pageCount) {
            visibleCount = newVisibleCount;
            pageCount = newPageCount;
            currentPage = 0;
            buildPager();
        }
        renderGallery();
    }

    previousButton.addEventListener('click', function () {
        if (currentPage > 0) {
            currentPage -= 1;
            renderGallery();
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentPage < pageCount - 1) {
            currentPage += 1;
            renderGallery();
        }
    });

    visibleCount = getVisibleCount();
    pageCount = Math.ceil(items.length / visibleCount);
    buildPager();
    renderGallery();
    window.addEventListener('resize', refreshGallery);
});
