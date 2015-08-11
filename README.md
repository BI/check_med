# The “CheckMed” Application
CheckMed URL: http://ads_bpa_rfq_test.barquinlab.com/

## Overview

This repository contains Barquin International’s response to the GSA RFQ 4QTFHS150004 for the establishment of Multiple Award Blanket Purchase Agreements (BPAs) for Agile Delivery Services (ADS I).

The requirement for this engagement is to use the open-source APIs from the openFDA initiative provided in the solicitation. Based on this requirement, the Barquin Team collected user stories from a variety of potential users, people not involved with the prototype development.

Grounded on the user stories and data analysis, we have developed “CheckMed,” a prototype web application that provides drug/ medication safety information for pregnant and nursing mothers and their caregivers. 

We believe this application has an important potential since it enables pregnant and nursing mothers, or other interested parties, to search for drugs/ medications they are taking or considering taking and quickly locate highlighted safety information extracted from the FDA’s Enforcement (recalls), Labeling and Adverse Events data sources. CheckMed has been developed using responsive layouts that automatically adjust to screen size and device, including  workstations, tablets, and mobile phones.

## Functionality

CheckMed offers the following functionality:

### Search

An easy to locate type-ahead search box is offered to the user for drug/medication search. The fields are displayed and searchable in sequence using brand name, generic name, and manufacturer name for convenient identification.

### Summary
The summary card returned after a search displays the most important information a pregnant or nursing mother should know about a drug/medication.

#### Recalls
If the drug searched has a recall, it is displayed as the very first item on the summary card with a warning message showing a color coded red cautionary symbol (example: Cleocin Phosphate, Pharmacia and Upjohn Company). The mouse-over tool tip provides information on the severity of the recall. Clicking on the Recall Report navigates users to the Recall Alert information containing recall details with mouse-over tool tip as needed:

 * Reason for Recall
 * Status
 * Distribution
 * Quantity
 * Issued
 * Lot Number 
 * Package NDC 
 * Product NDC

##### Warnings
The summary card returned upon a search contains color-coded warnings for: 
* Pregnant Mothers (example: Retin-A Micro)
* Nursing Mothers (example: Retin-A Micro)
* Pregnant or Nursing Mothers (example: ROBITUSSIN PEAK COLD MAXIMUM STRENGTH MULTI-SYMPTOM COLD)

#### Dosage
Dosage information is displayed following the warning messages due to the importance of overdose related dangers.

##### Adverse Events
A highlighted count of serious and not serious adverse events is located at the bottom of the summary card. Clicking on the count navigates users to the visualization of relevant statistics related to the selected drug/ medication, based on the seriousness of the adverse events:

1. Adverse Events Summary (example: Retin-A Micro)
 * Serious
 * Not Serious
 
2. Serious Adverse Events by Category (example, Retin-A Micro)
 * Death
 * Life Threatening
 * Disabling
 * Birth Defect
 * Hospitalization
 * Other Serious Event

### Full Details
Selecting Full Details on the summary card navigates users to the detail information for the drug/medication searched. Full detail consists of the following tabs and related information: 

 * General
 * Dosage
 * Pregnancy Warnings
 * General Warnings
 * Patient Info
 * Adverse Events

## Data Source

* https://open.fda.gov/drug/event/reference/
* https://open.fda.gov/drug/label/reference/
* https://open.fda.gov/drug/enforcement/
 
## Agile Prototype Life Cycle

### Assign One Leader (a)

The team started with assigning one leader for this sprint, the Product Manager. The Product Manager was identified as the leader with necessary authority over product design.
 
### Select Team and Define Roles (b)

We selected a multidisciplinary team of members who are experienced in agile methodology, data science, web application development, and data visualization.
 
The selected team includes 7 labor categories from Pool 3:

* Category 1 - Production Manager
* Category 3 - Interaction Designer/ User Researcher/ Usability Tester
* Category 5 - Visual Designer
* Category 6 - Front End Developer
* Category 7 - Backend Web Developer
* Category 8 - DevOps Engineer 
* Category 10 - Delivery Manager
 
### Collaboration

The team collaborated by having daily scrums, using git, google drive, Slack, Join Me and review sessions.

### Data Discovery

The team created a Talend interface to consume the three APIs provided, loaded sample data sets into a MySQL database, and created procedures to analyze the data. Additionally, we used DQ Analyzer to improve understanding of the data set.

### Evaluate What People Need (c)

After the initial data discovery, multiple product options were evaluated with people, using user stories from co-workers, friends and family members collected through Google Forms:

* User Story Survey Form: https://github.com/BI/octo-wookie/blob/master/_ADS_RFQ_Sprint/Survey_UserStory/Do%20you%20or%20someone%20you%20know%20take%20medication_%20We%20need%20your%20help!.pdf
* User Story Survery Results: https://github.com/BI/octo-wookie/blob/master/_ADS_RFQ_Sprint/Survey_UserStory/User%20Survey%20(Responses).pdf

Two main contenders emerged from this evaluation:
 
Option 1: Highlighting safety information for Pregnant and Nursing Mothers

Option 2: Highlighting safety information for multiple Special Groups, such as people with allergies

Due to the importance for society of Pregnant and Nursing Mothers, we chose Option 1 with the ability to scale up product capabilities in future iterations of the prototype.
 
### Selecting At Least Three Human-Centric Design Techniques (d)
 
The team selected four human-centric design techniques: 

1. User Story Survey
2. Usability Testing using Concurrent Think Aloud (CTA) Technique
3. User Review Sessions
4. Front Page Design Survey
 
The User Story Survey was completed at the beginning of the design phase, Usability Testing was done iteratively during the prototype lifecycle, and the User Review Sessions were done following the implementation of the Usability Test results. The Front Page Design Survey was implemented toward the end of the sprint to further refine the usability of the landing page.

* Front Page Design Survey Form: https://github.com/BI/octo-wookie/blob/master/_ADS_RFQ_Sprint/Survey_LandingPage_Option1_Option2/Front%20Page%20Survey.pdf
* Front Page Design Survey Results: https://github.com/BI/octo-wookie/blob/master/_ADS_RFQ_Sprint/Survey_LandingPage_Option1_Option2/Front%20Page%20-%20Usability%20Survey%20(Responses).pdf
 
### Design Style Guide (e)

Design for the web application and the Design Style Guide was created based on the feedback received from the selected human centric feedbacks. We’ve iterated on the design as we collected further information from Usability Testing and User Review Sessions. 

URL: https://ads_bpa_rfq_test.barquinlab.com/home/styleguide
 
### Usability Test (f)

The following usability test were performed on 5 people during different iterations of the product: 

* Usability Test Form: https://github.com/BI/octo-wookie/blob/master/_ADS_RFQ_Sprint/Survey_UsabilityTest/Website-Usability-TestScript_Template_20150625.doc.pdf
* Usability Test Results: https://github.com/BI/octo-wookie/tree/master/_ADS_RFQ_Sprint/Survey_UsabilityTest

Feedback was summarized and reviewed by the team for next iterations. 

URL: https://github.com/BI/octo-wookie/blob/master/_ADS_RFQ_Sprint/Survey_UsabilityTest/Usability_Test_Issues_20150630.xlsx.pdf

### Interactive Approach (g)

The team reviewed the design prototype daily and the feedback received was incorporated into the next iteration of the product.

### Multiple Device Support (h)

The prototype was tested on Windows, Mac, IOS and Android platforms for responsive design. See the following link for screen captures taken on multiple devices: https://github.com/BI/octo-wookie/tree/master/_ADS_RFQ_Sprint/Testing/Multiple_Device_Support
 
### Five Modern and Open Source Technologies (i)

The best applicable technologies were researched and selected for the product design and development. The following five modern open source technologies were selected:
 
1.    ReactJS
2.    SASS/SCSS
3.    Zurb Foundation
4.    BabelJS EcmaScript 6 Transpiler
5.    Webpack
 
### Platform as a Service (PaaS) (j)

This prototype is deployed in AWS Elastic Beanstalk.

### Unit Tests (k)

Unit tests have been developed to test the functionality of modules and components that make up the CheckMed application. Details for running the tests are at the following link, in the "Running Unit Tests" section: https://github.com/BI/octo-wookie/blob/master/_install_and_run/install_and_run.md
 
### Continuous Integration System (l)

Tools used for continuous integration are: git & github, circle-ci, Docker Registry and AWS Elastic Beanstalk. See the "Continuous Integration and Continuous Deployment Specification" section for details: https://github.com/BI/octo-wookie/blob/master/_install_and_run/install_and_run.md

### Configuration Management System (m)

We are using Docker, Docker Hub and AWS Elastic Beanstalk for configuration management. Application dependencies and application code are packaged and built into a Docker image. That image is then tagged with the git commit id and pushed to the Docker Hub repository. 

During the deployment step, Amazon Elastic Beanstalk then pulls down the Docker image and injects into it environment variables so that the application runs in Production mode. By using the container deployment approach, we are effectively proving version control on both the application source code and external dependencies.
 
### Continuous Monitoring (n)

For continuous security monitoring of our application hosting platform, we used CloudCheckr which integrates with our Amazon Web Services(AWS) account to provide the following:

* Monitors the amount of money spent on infrastructure and identifies idle resources, underutilized resources, and mis-matched Reserved Instances.  
* Monitors and reports on resource utilization, spanning everything from EC2 instances to S3 and all other AWS services.
* Using its 300 proprietary Best Practices, it ensures that we are using AWS in an optimal manner.
* Provides the security, audit, and visibility tools to help fulfill HIPAA, PCI, FISMA Moderate, and other major compliance frameworks. It also provides auditability for assets, users, and configurations.

### Deploy Software in a Container (o)

We have deployed CheckMed using Docker and AWS ElasticBeanstalk. When all autotests have passed, our Continuous Delivery workflow builds a Docker image based on the Dockerfile, and then pushes that image up to Docker Hub. A deployment file is then sent to Elastic Beanstalk which then downloads the Docker image, starts it, and deploys the running container.

### Install and Run Document (p)

The following install_and_run.md document has been created and tested for accuracy: https://github.com/BI/octo-wookie/blob/master/_install_and_run/install_and_run.md
 
### Open Source (q)

Prototype and underlying platforms used to create and run the prototype are openly licensed and free of charge.

