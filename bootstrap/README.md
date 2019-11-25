Portfolio using Bootstrap
=================================

@author: Cynthia W.

13-Oct-2019

Description
--------------

This project is the re-creation of "[Portfolio with HTML, CSS, and Git](https://cynwong.github.io/MBC/html_css/index.html)" using [Bootstrap CSS Framework](https://getbootstrap.com). This also has 3 web pages, namely: 
<ol>
    <li> <a href="https://cynwong.github.io/MBC/bootstrap/index.html" target="_blank">About</a> page</li>
    <li> <a href="https://cynwong.github.io/MBC/bootstrap/portfolio.html" target="_blank">Portfolio</a> page</li>
    <li> <a href="https://cynwong.github.io/MBC/bootstrap/contact.html" target="_blank">Contact</a> page</li>
</ol>

The following items are used in this project: 
<ul>
    <li>
        <strong>Navbar</strong>, used in this project, is  not Bootstrap's default Navbar. Bootstrap's navbar is constucted with CSS Flexbox. Being a flexbox, it has very limited in moblie repsonsiveness. Therefore, for the sake of reponsiveness, a new Navbar is built using Bootstrap's Grid system and Navs components.
    </li>
    <li>
        <strong>Responsive layout</strong> - Bootstrap's Grid system is used to ensure reponsiveness of all pages. For example, when viewed in extra small screen such as mobile phone, the pages will be displayed in full screen mode. The same pages will be displayed with some extra spaces when viewed in larger screens such as tablets or PCs.
    </li>
    <li>Bootstrap's style class named <code>.img-fluid</code> is used for Portfolio images to ensure <strong> image reponsiveness</strong></li>
    <li>
        Bootstrap handle <strong>media queries</strong> and mobile repsonsivenesss. Therefore, no other media queries are added.  
    </li>
    <li><strong>Sticky footer</strong> is used. Sticky footer is a footer that always stays at the bottom of screen, if content is short, or at the bottom of the page, if content is long. </li>
    <li><strong>Sub-grid</strong> is used in Portfolio page for the bonus activity. The code without sub-grid is commented out in the portfolio.html. They both react the similar way except being constructed with or without sub-grid and when the browser window is being resized. </li>
</ul>

Same images from Unit 1 project are used. Credit [Pixel](https://www.pexels.com/).
