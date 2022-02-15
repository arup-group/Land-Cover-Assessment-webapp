# Fuse Code OnTime Project Repo
This repo is used to deploy Project Code OnTime Applications to the UAT and Production COT AppServices,
This Readme will cover how to manage your project repo to optimise the deployment of Code OnTime Modules to the Fuse environment.

Set up new repo selecting this as the Template

## Folder Renaming and Set Up
Rename the folder named 'JobNumber_ShortProjectTag' with the appropriate 8 digit Job number and an appropriate Short Project Tag. e.g. for the A417 project it would be 26805300_A417. Within this folder there is an application folder called COTApplication. Rename this folder to be the name of your first project application and add folders in the job folder for each application you are wanting to deploy. For a Risk Application it would be named risk. This would be the folder structure for a project with multiple applications:
- JobNumber_ShortProjectTag
- - RiskApplication
- - DataApplication
- - LandApplication

## Set Up Automated Deployment
1. Rename arup-fuse-region-prod-cot-app-jobnumber-project-template-devopsrelease.json to fill in region, jobnumber and project
2. Open arup-fuse-region-prod-cot-app-jobnumber-project-template-devopsrelease.json
3. Find 'INSERT APPSERVICE NAME' and replace all instances with AppService Name
4. Find 'INSERT REPO JOB FOLDER NAME' and replace all instances with the respective name for the renamed JobNumber_ShortProjectTag folder
5. Find  'INSERT REPO NAME' and replace all instances with the repositories name
6. Find 'INSERT REGION' and replace all instances with region code (e.g. gb)
7. Save JSON File 
8. Navigate to DevOps Arup Fuse Project Releases here: https://ovearup.visualstudio.com/Arup-Fuse/_release?_a=releases&view=all&path=%5C Contact Fuse team for access
9. Click on relevant region folder directory
10. Create Folder in relevant Region Directory by pressing New and New Folder
11. Name folder _JobNumber_ShortProjectTag based on your project
12. Click OK
13. Click New
14. Import from JSON
15. Open arup-fuse-region-prod-cot-app-jobnumber-project-template-devopsrelease.json
16. Check all setting work and there are no red errors. Fix any errors in the tasks
17. Double check settings are linking to correct repo and correct appservice.
18. Check virtual application path mappings under configurations of the relevant appservice have been set up in Azure Porta, or follow the instructions under AppService Configurations section.
19. Save Release

## Uploading Code
Create Feature Branch of the repo to add specific applications into the relevant folders set up above. Publish your Code OnTime Application and paste the published files in the relevant folder in your local repo. Commit and push your changes and merge into main branch. Once merged your DevOps Release will deploy your applications to the Prod Code OnTime AppService for the relevant region. 

## AppService Configuration
Make sure your project is set up in the FuseCOTManager to make sure the AppService can be configured correctly for your applications. Speak to Fuse Representative to action. the set up of the relevant setting in the appservice











