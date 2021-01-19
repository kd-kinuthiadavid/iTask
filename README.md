# iTask: A task list organizer

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

### Built With

- [Bootstrap](https://getbootstrap.com)
- [Node](https://nodejs.org/en/) and [Express](https://expressjs.com/)
- [React](https://reactjs.org/) via [Create React App](https://create-react-app.dev/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- node and npm
  ```sh
  brew install node && node -v && npm -v
  ```
- yarn
  ```sh
  npm install --global yarn
  ```
- postgress

  - [follow these instructions](https://www.robinwieruch.de/postgres-sql-macos-setup) to install and setup postgress

  - alternatively, you can use [this installer](https://www.postgresql.org/download/) to download and setup postgress

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/kd-kinuthiadavid/iTask.git && cd iTask
   ```

2. Install dependencies

   ```sh
   yarn && cd client && yarn && cd ..
   ```

3. Create your db, db user and db password

   - first get into the psql interface

   ```sh
   sudo -u postgres psql
   ```

   - then:

   ```sh
    CREATE DATABASE yourdbname;
    CREATE USER youruser WITH ENCRYPTED PASSWORD 'yourpass';
    GRANT ALL PRIVILEGES ON DATABASE yourdbname TO youruser;
   ```

   - if you installed postgress via an the postgress installer, you can create the above using `pgAdmin` which should be accessible and can be launched from your computer

4. Create a `keys.js` file in the root directory of your project. We'll usee it to house environment variables. Paste the following and replace the values with your values:

   ```js
       module.exports = {
       DB_NAME: <yourDbame>, // e.g, "itaskdb"
       DB_PASSWORD: <yourDbPassword>, // e.g, "123456"
       DB_USER: <yourDbser>, // e.g, "postgres"
       JWT_SECRET: <randomSecret>, // e.g "myjwtsecret"
       }
   ```

5. Run the app

   ```sh
   yarn dev
   ```

   The above command runs the backend and the frontend concurently. The app can be accessed from `http://localhost:300` (you can also acess the backend from `http://localhost:5000`)

<!-- LICENSE -->

## License

Distributed under the MIT License.

<!-- CONTACT -->

## Contact

kd.kinuthiadavid@gmail.com

<!-- ACKNOWLEDGEMENTS -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
