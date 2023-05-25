/**
 * @jest-environment jsdom
 */

 import {getMoviesData } from '../src/index.js';

 describe('like test', () => {
   let counter;
 
   beforeEach(() => {
     document.body.innerHTML = '<div id="nav-counter"></div>';
   });
 
   test('getMoviesData to get movie likes', () => {
     getMoviesData();
 });