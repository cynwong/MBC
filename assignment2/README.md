Unit 02: CSS and Bootstrap
=================================

@author: Cynthia W.

13-Oct-2019

Description
--------------

This project is the re-creation of "[Unit 01 HTML, CSS, and Git Homework: Portfolio](https://github.com/cynwong/assignments/tree/master/assignment1)" using Bootstrap CSS Framework. This also has 3 web pages, namely: 
    1. [About](https://cynwong.github.io/assignments/assignment2/index.html) page
    2. [Portfolio](https://cynwong.github.io/assignments/assignment2/portfolio.html)
    3. [Contact](https://cynwong.github.io/assignments/assignment2/contact.html)

In this project, I have used the following items: 
    1. A navbar - Navbar, used in this project, is  not Bootstrap's default Navbar. Bootstrap's navbar is constucted with CSS Flexbox. Being a flexbox, it has very limited in moblie repsonsiveness. Therefore, for the sake of reponsiveness, a new Navbar is built using Bootstrap's Grid system and Navs components. 
    2. A responsive layout - Bootstrap's Grid system is used to ensure reponsiveness of all pages. For example, when viewed in extra small screen such as mobile phone, the pages will be displayed in full screen mode. The same pages will be displayed with some extra spaces when viewed in larger screens such as tablets or PCs. 
    3. Reponsive images - Portfolio images are using Bootstrap's image class, called ".img-fluid", to ensure responsiveness. 
    4. Media query - Only one media query is used for extra small screens' full-screen mode since Bootstrap handle most of the responsiveness. 
    5. Sticky footer
    6. Sub-grid is used in Portfolio page for the bonus activity. The code without sub-grid is commented out in the portfolio.html. They both react the same way except being constructed with or without sub-grid. 
