# LuxeVoyage 🏖️🏡

LuxeVoyage is a full-stack web application designed for users to discover, list, and review travel accommodations. Built with modern web technologies, it offers a seamless experience for hosts to showcase their properties and for travelers to find their perfect getaway.

## ✨ Features

*   **User Authentication**: Secure signup and login using `Passport.js`.
*   **Listings Management**: Users can create, edit, and delete their property listings.
*   **Image Uploads**: Integration with `Cloudinary` and `Multer` for seamless image uploading and storage.
*   **Interactive Maps**: Property locations are visualized using `Maplibre-GL` and `MapTiler`.
*   **Reviews & Ratings**: Users can leave reviews and ratings for properties they've visited.
*   **Flash Messages**: Real-time feedback to users for actions like logging in, creating listings, or errors using `connect-flash`.
*   **Data Validation**: Robust server-side data validation using `Joi`.
*   **Session Management**: Secure user sessions stored in MongoDB using `connect-mongo`.

## 🛠️ Tech Stack

*   **Frontend**: HTML, CSS, JavaScript, EJS (Embedded JavaScript templating), EJS-Mate
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB, Mongoose
*   **Authentication**: Passport.js (Local Strategy)
*   **Mapping**: MapLibre GL JS, MapTiler API
*   **Cloud Storage**: Cloudinary

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) installed
*   [MongoDB](https://www.mongodb.com/) installed and running locally, or an Atlas account
*   A [Cloudinary](https://cloudinary.com/) account for image hosting
*   A [MapTiler](https://www.maptiler.com/) account for map services

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/LuxeVoyage.git
    cd LuxeVoyage
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root directory of the project and add the following variables:

    ```env
    NODE_ENV=development
    ATLASDB_URL=your_mongodb_connection_string
    SECRET=your_session_secret
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    MAP_TOKEN=your_maptiler_api_key
    ```

4.  **Run the application**
    ```bash
    node app.js
    ```
    *Note: Alternatively, use `nodemon app.js` for automatic server restarts during development.*

5.  **Open in your browser**
    Navigate to `http://localhost:8080` in your web browser.

## 📂 Project Structure

*   `app.js`: The main entry point, configuring Express, middlewares, and database connection.
*   `models/`: Contains Mongoose schemas for Listings, Reviews, and Users.
*   `routes/`: Express routers for modular routing (listings, reviews, users).
*   `controllers/`: Core application logic and request handlers.
*   `views/`: EJS templates for the frontend UI.
*   `public/`: Static files such as custom CSS and client-side JavaScript.
*   `utils/`: Utility functions, including custom error handling.
*   `schema.js`: Joi schemas for rigorous server-side data validation.
*   `cloudConfig.js`: Setup and configuration for Cloudinary.

## 🤝 Contributing

Contributions are always welcome! If you'd like to improve LuxeVoyage, please fork the repository and submit a pull request.

## 📝 License

This project is licensed under the ISC License.
