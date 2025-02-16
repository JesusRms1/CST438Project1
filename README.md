# # CST438 Project1
[Github Repo](https://github.com/JesusRms1/CST438Project1)

## Overview
This is a recipe application that makes use of an API we found [here](https://github.com/public-apis/public-apis?tab=readme-ov-file). Specifically, mealdb api, that was free , no key required, and no request limit. The app allows the user to create/login into their account. In the app, the user is allowed to browser through recipes based on their area or category. The user can favorite the recipe and it's added to the users home page. From the home page, the user can view the recipes details, from instructions, id, area, category, and type. The user has the option to remove this recipe from his favorites. The user also has a profile page, where it shows the user its information. Theres also a setting page where the user can update credentials or delete either all of favorite recipes or the users account. The user can also sign out of the app through this page.

## Introduction

* Communication managed through Slack.
* There was initially 5 issues considered at the very begining. There was more issues made and completed as we continued the project.
* There were 16 issues completed throughout the project. (Although many issues were never stated but completed)

## Team Retrospective

### Gustavo Javier

- Gus's pull request list [a link to pr](https://github.com/JesusRms1/CST438Project1/pulls?q=is%3Apr+is%3Aclosed+author%3Agusjavi)
- Gus's issues list [a link to issues](https://github.com/JesusRms1/CST438Project1/issues?q=is%3Aissue%20state%3Aclosed%20assignee%3Agusjavi)

#### What was your role / which stories did you work on
  My role varied throughout the project. I worked on signup, login, profile, settings, search, api usage, styles, and small assistance here and there.

+ What was the biggest challenge?
  + My biggest challenge throughout this would be connecting/using both styles of navigations in react-native. The solution is messy (nested nav), but works for the purpose of the application. This also includes the removal of a back up button and titles.
+ Why was it a challenge?
  + This was challenging since the format/language for react-native was new to me. I didn't know how to make it work nor did the videos/documents assist directly to our issue.
  + How was the challenge addressed?
    + This challenge was addressed by trail and error. One overflow thread, youtube video, and some chat assistance.
+ Favorite / most interesting part of this project
  + Favorite part would be the search page and navigation system. 
+ If you could do it over, what would you change?
  + Perhaps preparing the idea/stories/issues of the app better and more detailed. 
+ What is the most valuable thing you learned?
  + I would say communication and trust.  

### Daniel Rodas

- Daniel's pull requests [a link to pr](https://github.com/JesusRms1/CST438Project1/pulls?q=is%3Apr+is%3Aclosed+author%3ATunedTuna)
- Daniel's issues [a link to your issues](https://github.com/JesusRms1/CST438Project1/issues?q=is%3Aissue%20state%3Aclosed%20assignee%3ATunedTuna)

#### What was your role / which stories did you work on
  +I set up the home page, search page, and recipe info page( which were later cleaned up by other team members). I made the date from search populate the home page, and the single data from the home page pass into the recipe page. 
+ What was the biggest challenge?
    + Learning  react/expo fast.
+ Why was it a challenge?
  + It takes time for me to fully understand new concepts, so having to work in a team and time constraints increased difficulty.
  + How was the challenge addressed?
      +Breaking code on private branches and researching.
+ Favorite / most interesting part of this project
  + Using my knowledge from previous classes to make stuff work.
+ If you could do it over, what would you change?
    + Manging my time better to get better looking results on the project.
+ What is the most valuable thing you learned?
    + Coordination and communication.

### Jesus Ramos

- Jesus's pull requests [a link to pr](https://github.com/JesusRms1/CST438Project1/pulls?q=is%3Apr+is%3Aclosed+author%3AJesusRms1)
- Jesus's issues [a link to your issues](https://github.com/JesusRms1/CST438Project1/issues?q=is%3Aissue%20state%3Aclosed%20assignee%3AJesusRms1)

#### What was your role / which stories did you work on
My role was backend. I was tasked with creating the database and tables used in the app. I also worked on adding sign and login functionality. adding new users to the database, testing if users can log in. NO username duplicates, login and sign up are not case sensitive. Checking if passwords match. I also worked on styling login and sign-up pages.

+ What was the biggest challenge?
  The biggest challenge was getting the database running. I have some experience with databases, but the biggest part was making the database local without having to use Heroku.
+ Why was it a challenge?
  It was a challenge because the first database I had made for the app was a MYSQL database that could only be accessed with my device. I made it locally but the server only worked on my device and wouldn't be accessible to my groupmates  That caused problems with testing and group members being able to log in and add API implementations.
  + How was the challenge addressed?
    The challenge was addressed by revamping the database, took me a while but I was able to get it up and running using Expo SQLite. Once we got the database working we were able to continue working on our project. It was a learning curve, my first time using react native but seeing the example that was on Canvas helped a lot in the process. 
+ Favorite / most interesting part of this project
  My favorite part of the project was being able to learn a new environment, I've never used React Native, and being able to work on a project with React was fun and I learned from it. 
+ If you could do it over, what would you change?
  If I can do it over I would like to add more implementation. we faced problems in our app and we had ideas that we had to get rid of. so being able to implement these ideas would be something I would change. I also would like to change some of the layout, and maybe add some images or colors to the app. Make the UI more presentable, 
+ What is the most valuable thing you learned?
   The most valuable thing I learned was able to work with my group well, being able to have great communication, make deadlines, and be accountable for their contributions and tasks. If we needed help or were stuck in a problem we had one another for support. 


## Conclusion

- How successful was the project?
  - I would say it was pretty succesful in the last week of the project. We set out a few issues in the beginning that we didn't have time for at the end. But majority was completed.
- What was the largest victory?
  - I would say the creation of the db was the largest victory.  
- Final assessment of the project
