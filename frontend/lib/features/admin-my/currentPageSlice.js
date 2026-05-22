import { createSlice } from '@reduxjs/toolkit';

const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState: {
        name: 'Home Page',
        id: "section-1",
        html: `
            <section class="hero-section">
                <h1>Welcome to Our Platform</h1>
                <p>Build, customize, and create stunning pages effortlessly.</p>
                <button class="cta-button">Get Started</button>
            </section>
        `,
        css: `
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background: #f5f7fa;
                color: #333;
                text-align: center;
            }
            .hero-section {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 20px;
                border-radius: 10px;
            }
            .hero-section h1 {
                font-size: 2.5rem;
                margin-bottom: 10px;
            }
            .hero-section p {
                font-size: 1.2rem;
                margin-bottom: 20px;
            }
            .cta-button {
                padding: 12px 24px;
                font-size: 1rem;
                background: #ff7eb3;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: 0.3s;
            }
            .cta-button:hover {
                background: #ff5777;
            }
        `,
        js: `
            document.querySelector('.cta-button')?.addEventListener('click', () => {
                alert('Welcome! Let’s start building.');
            });
        `,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            return { ...action.payload }; // Ensures state is properly updated
        },
    },
});

export const { setCurrentPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
