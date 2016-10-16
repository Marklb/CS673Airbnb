## Setup

### Requirements  

#### Software dependencies:
Before getting started you need the software listed below installed. A basic understanding of the required software is also recommended. Platform specific installation instructions can be found on the specific software's website.
1. NodeJs (Version 4+ recommended.)
2. NPM (Version 2+ Recommended. This will be installed with NodeJs if the installer is used.)
2. MySQL Server (Free Community version should be fine.)  

#### Getting the code:
After installing the software dependencies the project's code can be found in the git repository on github.com. Currently the repository is private, so if you need access one of the team members can add your github account to our collaborators list to access the repository.  
To clone the repository on your computer using the git cli use this command:  
```
git clone https://github.com/Marklb/CS673Airbnb.git
```  

#### Installing NPM dependencies:  
You can find the list of npm dependencies in the packages.json file. All of the modules we are using are publicly available. For more information on a specific module you can check its repository on npmjs.org.  
To install the modules you and use the npm install command to have npm install each module listed as a dependency in our package.json. Make sure your command line/terminal is at the root of our project directory where the package.json is located and run this command:  
```
npm install
```
If you decide to manually install the dependencies instead of using the command above then you should be careful and make sure you install the correct versions.  


#### Creating the database:  
This step may be different depending on how you installed MySQL. I will describe the process using the MySQL cli.  
##### Steps:  
1. cd into the sql directory where we store our sql schema files that contain the queries to create the database and tables.
> The current scripts will only create the database from scratch. If you have a previous version with created and want to keep the data then you should back up your database before proceeding or modify the queries to update your tables, updating like that is not recommended since you may run into issues if your old table rows are missing required attributes or contain attributes no longer used.  
```
cd private_resources/sql
```  

2. Run the queries in the script that creates the database. This can command may be different depending on how your MySQL is installed.  
```
// Command format: mysql --user=<username> --password=<password> < <filename>
mysql --user=root < Airbnb_v02.sql
```
