
function hasNumbers(myString) {
    const regex = /\d/; // The \d metacharacter matches any digit (0-9)
    // return regex.test(myString);
    return false;
}

// Toggle password visibility
(function () {
    const toggle = document.getElementById('togglePassword');
    const pwd = document.getElementById('loginPassword');
    if (toggle && pwd) {
        toggle.addEventListener('click', () => {
            const visible = pwd.type === 'text';
            pwd.type = visible ? 'password' : 'text';
            toggle.innerHTML = visible ? '<ion-icon name="eye-outline" class="fs-5" role="img"></ion-icon>' : '<ion-icon name="eye-off-outline" class="fs-5" role="img"></ion-icon>';

            // const icon = toggle.querySelector('ion-icon');
            // if (icon) {
            //     icon.setAttribute('name', visible ? 'eye-outline' : 'eye-off-outline');
            // } else {
            //     toggle.innerHTML = visible
            //         ? '<ion-icon name="eye-outline"></ion-icon>'
            //         : '<ion-icon name="eye-off-outline"></ion-icon>';
            // }

            toggle.setAttribute('aria-label', visible ? 'Show password' : 'Hide password');
        });
    }

    // Bootstrap-style form validation
    const form = document.getElementById('loginForm');
    const passwordInput = document.getElementById('loginPassword');
    const passwordValidity = document.querySelector('.password-validity');
    if (form) {
        form.addEventListener('submit', function (e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();

                // if (passwordInput.validity.tooShort) {
                //     passwordValidity.textContent = 'Password must be at least 8 characters long.';
                // } else {
                //     passwordValidity.textContent = 'Please enter your password.';
                // }

                passwordValidity.textContent = 'Please enter your password.';
            }
            // else if (!hasNumbers(passwordInput.value)) {
            //     e.preventDefault();
            //     e.stopPropagation();

            //     passwordInput.classList.add('');
            //     passwordValidity.textContent = 'Password must contain at least one number.';
            // }
            else {
                // Replace with real submit logic (AJAX / form post)
                e.preventDefault();
                // Example: close modal on successful submit
                const modalEl = document.getElementById('loginModal');
                const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                modal.hide();
            }
            form.classList.add('was-validated');
        }, false);
    }
})();




// Resource filtering
(function () {
    const searchInput = document.getElementById('resources-search');
    const categorySelect = document.getElementById('resources-category');
    const tagButtons = document.querySelectorAll('.tag-btn');
    const cards = Array.from(document.querySelectorAll('.resource-card'));
    const emptyState = document.getElementById('resources-empty');

    let activeTag = 'all';

    function normalize(text) {
        return (text || '').toString().toLowerCase();
    }

    function filterResources() {
        const q = normalize(searchInput.value);
        const category = categorySelect.value;
        let shown = 0;

        cards.forEach(card => {
            const title = normalize(card.dataset.title);
            const tags = normalize(card.dataset.tags);
            const cat = normalize(card.dataset.category);

            const matchesQuery = q === '' || title.includes(q) || tags.includes(q);
            const matchesCategory = category === 'all' || cat === category;
            const matchesTag = activeTag === 'all' || tags.split(',').includes(activeTag);

            if (matchesQuery && matchesCategory && matchesTag) {
                card.classList.remove('d-none');
                shown++;
            } else {
                card.classList.add('d-none');
            }
        });

        emptyState.classList.toggle('d-none', shown !== 0);
    }

    searchInput.addEventListener('input', filterResources);
    categorySelect.addEventListener('change', filterResources);

    tagButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tagButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeTag = btn.dataset.tag;
            filterResources();
        });
    });

    // Initialize
    filterResources();
})();