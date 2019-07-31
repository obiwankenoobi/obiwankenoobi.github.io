# Visualization of Physics and CS Concepts

## Physics & Math

### Forces 
* Accelaration  
  `Acc = force / mass`

* Friction (simplified)  
  `Friction = -1 * direction * constant`

* Drag force (simplified)  
  `Drag = -1 * constant * ||obj.velocity||^2 * direction`

* Gravitational Attraction (simplified)  
  `GA = ((G * obj1.mass * obj2.mass) / distance^2) * direction`

* Steering  
  `Steering = (desire.direction * maxSpeed) - (direction * maxSteer)`

### Vectors
* Magnitude  
  `Magnitude^2 = vector.x^2 + vector.y^2`



<br>
<br>
<br>


## Genetic Algorithm

### Darwinian Natural Selection

* **Heredity**  
  There must be proccess in place by which children receive the properties of their parents

* **Varietion**  
  There must be a variety of traits present in the population or a mean with which to intreduce variation

* **Selection**  
  There must be a mechanism by which some members of the population have the opportunity to be parents and pass down therir genetic information and some do not. This is typically referred to as "survival of the fittst"


## Graphs

* **A***
  >In computer science, A* (pronounced "A-star") is a computer algorithm that is widely used in pathfinding and graph traversal, which is the process of finding a path between multiple points, called "nodes". It enjoys widespread use due to its performance and accuracy. However, in practical travel-routing systems, it is generally outperformed by algorithms which can pre-process the graph to attain better performance, although other work has found A* to be superior to other approaches. [wikipedia](https://en.wikipedia.org/wiki/A*_search_algorithm)

* **DFS**
  >Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking. A version of depth-first search was investigated in the 19th century by French mathematician Charles Pierre Trémaux as a strategy for solving mazes. [wikipedia](https://en.wikipedia.org/wiki/Depth-first_search)

* **BFS**
  >Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. It uses the opposite strategy as depth-first search, which instead explores the highest-depth nodes first before being forced to backtrack and expand shallower nodes. BFS and its application in finding connected components of graphs were invented in 1945 by Konrad Zuse, in his (rejected) Ph.D. thesis on the Plankalkül programming language, but this was not published until 1972. It was reinvented in 1959 by Edward F. Moore, who used it to find the shortest path out of a maze, and later developed by C. Y. Lee into a wire routing algorithm (published 1961). [wikipedia](https://en.wikipedia.org/wiki/Breadth-first_search)