# AI detection website

This doc will guide you how to install and run the site properly on localhost. The following steps are required to ensure the app run properly.

## 1. Clone the project

On your project folder, open terminal on Visual Studio Code or Command Prompt on your project folder and type the follow line:

```powershell
git clone https://github.com/nguyenducduy2000/AI-detection-website.git
```

## 2. Install dependencies

The projects contain 2 files dedicates to client side and backend side, which both contain their own dependencies.

```
├── your-project-folder
│ ├── AI-detection-backend
│ ├── AI-detection-client
```

You will need to download all the necessary library in order for the project to work. To do that, do the following steps:

1. Change directory to `AI-detection-backend` in terminal
    
    ```powershell
    cd AI-detection-backend
    ```
    
2. Install dependencies
    
    ```powershell
    npm install
    ```
    
3. Do the same in `AI-detection-client` folder
    - First change the directory in terminal to the AI-detection-client
    
    ```powershell
    cd AI-detection-client
    ```
    
    - Repeat the command to download dependencies
    
    ```powershell
    npm install
    ```
    

The dependencies now should be in node_modules folder.

## 3. Set up environment in .env file

The `.env` file contains all the keys for the connection and communications between parts in the website. The environment is the means to contain connection URL to important middleware such as mySQL database(See this [doc](https://docs.docker.com/get-started/08_using_compose/) for creating docker-image tutorial), message broker rabbitMQ (To set up an instance, check this [tutorial](https://www.cloudamqp.com/blog/part1-rabbitmq-for-beginners-what-is-rabbitmq.html)). Fill in all the keys, link and password that used to connect.

## 4. Initialte mySQL docker database

The backend database of the project uses mySQL image from docker. To make the project run properly, we need to initialize it. First, we need to change directory to `AI-detection-backed` if you are not currently in that directory.

```powershell
cd AI-detection-backend
```

Next, start the docker by using this command line:

```powershell
docker-compose up -d db
```

## 5. Start the project

To start the project, type the following command for both `AI-detection-backend` and `AI-detection-client`

```powershell
npm start
```