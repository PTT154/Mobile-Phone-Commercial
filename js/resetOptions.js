function resetProductOptions() {
    // Reset storage option
    const storageOptions = document.querySelectorAll('.storage-select .storage-option');
    storageOptions.forEach((option, idx) => {
        option.classList.toggle('active', idx === 0);
    });

    // Reset color option
    const colorOptions = document.querySelectorAll('.color-select .color-option');
    colorOptions.forEach((option, idx) => {
        option.classList.toggle('active', idx === 0);
    });
}