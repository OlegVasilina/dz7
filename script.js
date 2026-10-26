/* Практическая работа №6. Калькулятор стоимости услуги. */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('service-calculator');
    var quantityInput = document.getElementById('quantity');
    var optionGroup = document.getElementById('option-group');
    var optionSelect = document.getElementById('service-option');
    var propertyGroup = document.getElementById('property-group');
    var propertyCheckbox = document.getElementById('extra-property');
    var errorMessage = document.getElementById('calculator-error');
    var resultMessage = document.getElementById('calculator-result');
    var servicePrices = {
        basic: 100,
        standard: 200,
        premium: 150
    };

    function getSelectedServiceType() {
        var selectedType = form.querySelector('input[name="serviceType"]:checked');
        return selectedType ? selectedType.value : 'basic';
    }

    function updateVisibleOptions() {
        var serviceType = getSelectedServiceType();

        optionGroup.hidden = serviceType !== 'standard';
        propertyGroup.hidden = serviceType !== 'premium';

        if (serviceType !== 'standard') {
            optionSelect.selectedIndex = 0;
        }
        if (serviceType !== 'premium') {
            propertyCheckbox.checked = false;
        }
    }

    function updatePrice() {
        var quantityText = quantityInput.value.trim();
        var quantityPattern = /^[1-9]\d*$/;
        var serviceType = getSelectedServiceType();
        var unitPrice = servicePrices[serviceType];

        errorMessage.textContent = '';
        resultMessage.textContent = '';
        resultMessage.hidden = true;

        if (!quantityPattern.test(quantityText)) {
            errorMessage.textContent = 'Введите положительное целое количество.';
            return;
        }

        var quantity = Number(quantityText);
        if (!Number.isSafeInteger(quantity)) {
            errorMessage.textContent = 'Количество слишком велико. Укажите меньшее число.';
            return;
        }

        if (serviceType === 'standard') {
            var selectedOption = optionSelect.options[optionSelect.selectedIndex];
            unitPrice += Number(selectedOption.getAttribute('data-price'));
        }

        if (serviceType === 'premium' && propertyCheckbox.checked) {
            unitPrice += 40;
        }

        var total = quantity * unitPrice;
        if (!Number.isSafeInteger(total)) {
            errorMessage.textContent = 'Стоимость слишком велика. Укажите меньшее количество.';
            return;
        }

        resultMessage.textContent = 'Итоговая стоимость: ' +
            total.toLocaleString('ru-RU') + ' ₽ (' +
            quantity.toLocaleString('ru-RU') + ' × ' +
            unitPrice.toLocaleString('ru-RU') + ' ₽).';
        resultMessage.hidden = false;
    }

    form.addEventListener('change', function (event) {
        if (event.target.name === 'serviceType') {
            updateVisibleOptions();
        }
        updatePrice();
    });

    quantityInput.addEventListener('input', updatePrice);

    updateVisibleOptions();
    updatePrice();
});
