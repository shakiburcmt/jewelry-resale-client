import React from 'react';

const Blog = () => {
    // blog dynamic data
    const blogData = [
        {
            id: 1,
            question: "What are the different ways to manage a state in a React application?",
            answer: "Local state, Global state, Server state, URL state are four main types of state. Local state is data we manage in one or another component. Local state is most often managed in React using the useState hook. Global state is data we manage across multiple components. Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least. Data that comes from an external server that must be integrated with our UI state. Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state. Data that exists on our URLs, including the pathname and query parameters. URL state is often missing as a category of state, but it is an important one."
        },
        {
            id: 2,
            question: "How does prototypical inheritance work?",
            answer: "Prototypical inheritance allows us to reuse the properties or methods from one JavaScript object to another through a reference pointer function. All JavaScript objects inherit properties and methods from a prototype: Date objects inherit from Date. When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype."
        },
        {
            id: 3,
            question: "What is a unit test? Why should we write unit tests?",
            answer: "The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages. Unit testing ensures that all code meets quality standards before it's deployed. This ensures a reliable engineering environment where quality is paramount. Over the course of the product development life cycle, unit testing saves time and money, and helps developers write better code, more efficiently."
        },
        {
            id: 4,
            question: "React vs. Angular vs. Vue: Which framework is better?",
            answer: "Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option. Angular, developed by Google, was first released in 2010, making it the oldest of the lot. It is a TypeScript-based JavaScript framework. Vue, also known as Vue.js, is the youngest member of the group. It was developed by ex-Google employee Evan You in 2014. Over the last several years, Vue has seen a substantial shift in popularity, even though it does not have the backing of a large company. React, developed by Facebook, was initially released in 2013."
        },
    ]
    return (
        <div className="card grid lg:grid-cols-2 bg-base-200 shadow-2xl my-2">
            {
                blogData.map(blog => <div key={blog.id} className="card-body">
                    <h2 className="card-title">{blog.id}. {blog.question}</h2>
                    <p className='text-justify'>Answer: {blog.answer}</p>
                </div>)
            }
        </div>
    );
};

export default Blog;