# Sample Fonts for Testing Theming Engine

To test the custom font upload feature:
1. Open the application at `http://localhost:5173`.
2. Click **"Theme: Oceanic Blue"** (or the Theme Studio icon) in the top-right navbar.
3. In the **"Custom Font Face"** section, click the upload box.
4. Select any `.ttf`, `.otf`, `.woff`, or `.woff2` font file from your system (or download one from [Google Fonts](https://fonts.google.com) such as *Roboto*, *Poppins*, or *Fira Code*).
5. Watch the entire application's typography immediately adopt the new typeface via the `FontFace` API.
6. Refresh the page to verify that the font rehydrates seamlessly from `localStorage` without any flash of unstyled content!
