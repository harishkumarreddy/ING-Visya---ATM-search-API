# ING Visya - ATM search API
ING Visya - ATM search API task project

### System Dependencies:
1. Node latest LTS
2. NPM Latest LTS

### Setup Steps:
1. Clone the repo into your local project dir.
2. Open CLI into the project location(mostly package.json location is project location).
3. Run install command to install the dependencies
    ```
        npm install
    ```
4. Run the migration to update sync the datat in to sysstem.
    ```
        npm run migrate
    ```
5. Run selected command to start application.

    Dev for auto detection to restrt the app services.
    ```
        npm run dev
    ```
    Other than dev. you need to restart manually if some is thing changed
    ```
        npm start
    ```
6. Run the test command for unit testing.
    ```
        npm test
    ```


***Note:*** Edit these specific file to chenge the Application env and runtime configurations. viz:
1. **.env** *(/)* : standerd application environmental configuration values.
2. **app.config.js** *(/configs/)* : Application runtime configurations.
3. **cors.config.js** *(/configs/)* : CORS whitelisted URLs. **'*'** to allo any to access these apis.
4. **speeches.config,js** *(/configs/)* : Text messages duering API response.
5. **wildcardroutes.config,js** *(/configs/)* : which are not required Authorization Token. These are internal APIs.


### Configur Postman:
1. Load environment file *(\postman\DEV-ENV.postman_environment.json)* into postman enveironments by clicking on *Manage Environments* which is presented at rop-right cornre.
2. Load collection file *(\postman\ingVisya.postman_collection.json)* in to postman collections by clicking on *import* option which is presented at top-left on black strip as secound item.

***Note:*** Edit the environment variables with your dev environment.
