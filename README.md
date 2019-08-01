# Visualization of Physics and CS Concepts

## Physics & Math

### Forces 
* Accelaration 
  >In physics, acceleration is the rate of change of velocity of an object with respect to time. An object's acceleration is the net result of all forces acting on the object, as described by Newton's Second Law. The SI unit for acceleration is metre per second squared (m⋅s−2). Accelerations are vector quantities (they have magnitude and direction) and add according to the parallelogram law. The vector of the net force acting on a body has the same direction as the vector of the body's acceleration, and its magnitude is proportional to the magnitude of the acceleration, with the object's mass (a scalar quantity) as proportionality constant. [wikipedia](https://en.wikipedia.org/wiki/Acceleration)
  
  formula (simplified):
  ```
  Acc = force:Vector / mass:number
  ```

<br>
<br>

* Friction
    > Friction is the force resisting the relative motion of solid surfaces, fluid layers, and material elements sliding against each other. [wikipedia](https://en.wikipedia.org/wiki/Friction)

  formula (simplified):
  ```
  Friction = -1 * direction:Vector * constant:number
  ``` 
  
<br>
<br>

* Drag force 
    >In fluid dynamics, drag (sometimes called air resistance, a type of friction, or fluid resistance, another type of friction or fluid friction) is a force acting opposite to the relative motion of any object moving with respect to a surrounding fluid.[1] This can exist between two fluid layers (or surfaces) or a fluid and a solid surface. Unlike other resistive forces, such as dry friction, which are nearly independent of velocity, drag forces depend on velocity.[2][3] Drag force is proportional to the velocity for a laminar flow and the squared velocity for a turbulent flow. Even though the ultimate cause of a drag is viscous friction, the turbulent drag is independent of viscosity. [wikipedia](https://en.wikipedia.org/wiki/Drag_(physics))

    formula (simplified):
    ```
    Drag = -1 * constant:number * ||obj.velocity:Vector||^2 * direction:Vector
    ``` 

<br>
<br>

* Gravitational Attraction
    >Gravity (from Latin gravitas, meaning 'weight'[1]), or gravitation, is a natural phenomenon by which all things with mass or energy—including planets, stars, galaxies, and even light[2]—are brought toward (or gravitate toward) one another. On Earth, gravity gives weight to physical objects, and the Moon's gravity causes the ocean tides. The gravitational attraction of the original gaseous matter present in the Universe caused it to begin coalescing, forming stars—and for the stars to group together into galaxies—so gravity is responsible for many of the large-scale structures in the Universe. Gravity has an infinite range, although its effects become increasingly weaker on farther objects. [wikipedia](https://en.wikipedia.org/wiki/Gravity)

    formula (simplified):
    ```
    GA = ((G * obj1.mass:number * obj2.mass:number) / distance:Vector^2) * direction:Vector
    ```

<br>
<br>

* Steering  
  [more info](http://www.red3d.com/cwr/steer/)
  ```
  Steering = (desire.direction * maxSpeed) - (direction * maxSteer)
  ```

<br>
<br>

### Vectors
* Magnitude  
  `Magnitude^2 =Vector.x^2 +Vector.y^2`



<br>
<br>
<br>


## Genetic Algorithm
> In computer science and operations research, a genetic algorithm (GA) is a metaheuristic inspired by the process of natural selection that belongs to the larger class of evolutionary algorithms (EA). Genetic algorithms are commonly used to generate high-quality solutions to optimization and search problems by relying on bio-inspired operators such as mutation, crossover and selection. John Holland introduced genetic algorithms in 1960 based on the concept of Darwin’s theory of evolution; afterwards, his student David E. Goldberg extended GA in 1989.  [wikipedia](https://en.wikipedia.org/wiki/Genetic_algorithm)



### Darwinian Natural Selection

* **Heredity**  
  There must be proccess in place by which children receive the properties of their parents

* **Varietion**  
  There must be a variety of traits present in the population or a mean with which to intreduce variation

* **Selection**  
  There must be a mechanism by which some members of the population have the opportunity to be parents and pass down therir genetic information and some do not. This is typically referred to as "survival of the fittst"

<br>
<br>

## Graphs

* **A***
  >In computer science, A* (pronounced "A-star") is a computer algorithm that is widely used in pathfinding and graph traversal, which is the process of finding a path between multiple points, called "nodes". It enjoys widespread use due to its performance and accuracy. However, in practical travel-routing systems, it is generally outperformed by algorithms which can pre-process the graph to attain better performance, although other work has found A* to be superior to other approaches. [wikipedia](https://en.wikipedia.org/wiki/A*_search_algorithm)

* **DFS**
  >Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking. A version of depth-first search was investigated in the 19th century by French mathematician Charles Pierre Trémaux as a strategy for solving mazes. [wikipedia](https://en.wikipedia.org/wiki/Depth-first_search)

* **BFS**
  >Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. It uses the opposite strategy as depth-first search, which instead explores the highest-depth nodes first before being forced to backtrack and expand shallower nodes. BFS and its application in finding connected components of graphs were invented in 1945 by Konrad Zuse, in his (rejected) Ph.D. thesis on the Plankalkül programming language, but this was not published until 1972. It was reinvented in 1959 by Edward F. Moore, who used it to find the shortest path out of a maze, and later developed by C. Y. Lee into a wire routing algorithm (published 1961). [wikipedia](https://en.wikipedia.org/wiki/Breadth-first_search)


<br>
<br>

## CS Problems

**Traveling Salesperson**
>The travelling salesman problem (TSP) asks the following question: "Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city and returns to the origin city?" It is an NP-hard problem in combinatorial optimization, important in operations research and theoretical computer science. [wikipedia](https://en.wikipedia.org/wiki/Travelling_salesman_problem)