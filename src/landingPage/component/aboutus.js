import React from 'react'
import { Link } from 'react-router-dom';


const Aboutus = () =>{
    return(

        <>
        
        <div class="responsive-container-block bigContainer">
  <div class="responsive-container-block Container bottomContainer">
    <div class="ultimateImg">
      <img class="mainImg" src=""/>
      {/* <div class="purpleBox">
        <p class="purpleText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget purus lectus viverra in semper nec pretium mus.
        </p>
        <img class="stars" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/mp5.svg"/>
      </div> */}
    </div>
    <div class="allText bottomText">
      <p class="text-blk headingText">
        About Me
      </p>
      <p class="text-blk subHeadingText">
      Welcome to Dormitory Discover!
      </p>
      <p class="text-blk description">
      At Dormitory Discover, our mission is to simplify the process of finding suitable dormitory accommodations for students and young professionals. We believe that finding the right living space should be hassle-free and transparent, and we're committed to providing a platform that connects dormitory owners with potential tenants in a seamless and efficient manner.
      </p>
      <p class="text-blk headingText">
      Our Goals
      </p>
      <p class="text-blk description">
      Accessibility: We strive to make dormitory information easily accessible to all students, ensuring that everyone has the opportunity to find a comfortable and affordable living space.

Transparency: We promote transparency in dormitory rental transactions by providing detailed information about available accommodations, including pricing, amenities, and location.

User Experience: We prioritize user experience and continuously work to enhance our platform's features and functionality to make the dormitory search process as smooth and enjoyable as possible.

      </p>
      <p class="text-blk headingText">
      Contact Us
      </p>
      <p class="text-blk description">
      Have questions or feedback? We'd love to hear from you!
      Email: <a href="">dormitorycontact@gmail.com</a><br />
      </p>
      
      <Link to="/">
      <a class="explore">
        View Services
      </a>
      </Link>
    </div>
  </div>
</div>
        
        </>


    );
}

export default Aboutus;