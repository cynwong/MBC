Unit 02: CSS and Bootstrap
=================================

@author: Cynthia W.

13-Oct-2019

Description
--------------

This project is the re-creation of "[Unit 01 HTML, CSS, and Git Homework: Portfolio](https://github.com/cynwong/assignments/tree/master/assignment1)" using [Bootstrap CSS Framework](https://getbootstrap.com). This also has 3 web pages, namely: 
<ol>
    <li> [About](https://cynwong.github.io/assignments/assignment2/index.html) page</li>
    <li> [Portfolio](https://cynwong.github.io/assignments/assignment2/portfolio.html) page</li>
    <li> [Contact](https://cynwong.github.io/assignments/assignment2/contact.html) page</li>
</ol>

In this project, I have used the following items: 
<ul>
    <li>
        <strong>Navbar</strong>, used in this project, is  not Bootstrap's default Navbar. Bootstrap's navbar is constucted with CSS Flexbox. Being a flexbox, it has very limited in moblie repsonsiveness. Therefore, for the sake of reponsiveness, a new Navbar is built using Bootstrap's Grid system and Navs components.
    </li>
    <li>
        <strong>Responsive layout</strong> - Bootstrap's Grid system is used to ensure reponsiveness of all pages. For example, when viewed in extra small screen such as mobile phone, the pages will be displayed in full screen mode. The same pages will be displayed with some extra spaces when viewed in larger screens such as tablets or PCs.
    </li>
    <li>Bootstrap's style class named <code>.img-fluid</code> is used for Portfolio images to ensure <strong> image reponsiveness</strong></li>
    <li>
        Only one <strong>media query</strong> is used for extra small screens' full-screen mode since Bootstrap handle most of the responsiveness. 
    </li>
    <li><strong>Sticky footer</strong> is used. Sticky footer is a footer that always stays at the bottom of screen, if content is short, or at the bottom of the page, if content is long.</li>
    <li><strong>Sub-grid</strong> is used in Portfolio page for the bonus activity. The code without sub-grid is commented out in the portfolio.html. They both react the same way except being constructed with or without sub-grid. </li>

Same images from Unit 1 project are used. Credit [Pixel](https://www.pexels.com/).
