
import { BallClass, Config } from "../ball";
import { CountFramesClass } from "../countFrames";

export function randomNumber(min:number ,max: number) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

export function drawBalls(balls: Array<BallClass>, color: string, cb: Function) {
    for (const ball of balls) {
        cb(ball, color);
    }
}



export function createBalls(numOfBalls: number, canvas: HTMLCanvasElement) {
    let balls: Array<BallClass> = [];
    let ball: BallClass;

    for (let idx = 0; idx < numOfBalls; idx++) {
        let ballConfig: Config;
        ballConfig = {
            acc:      { x: 0, y: 0 },
            pos:      { x: (canvas.width / numOfBalls) / 2 + idx * (canvas.width / numOfBalls), y: 0},
            velocity: { x: 0, y: 0 },
            mass: randomNumber(1, 5)
        }
        ball = new BallClass(ballConfig);
        
        balls.push(ball);
    }
    return balls;
}

export function bounderyCheck(ball: BallClass, canvas: HTMLCanvasElement) {
   
    if (ball.pos.x >= canvas.width) {
        ball.velocity.x *= -1;
        ball.pos.x = canvas.width;
    } else if (ball.pos.x < 0) {
        ball.velocity.x *= -1;
        ball.pos.x = 0;
    }
    

    if (ball.pos.y >= canvas.height - ball.radius / 2) {
        ball.velocity.y *= -1;
        ball.pos.y = canvas.height - ball.radius / 2;
    }  else if (ball.pos.y < 0) {
        ball.velocity.y *= -1;
        ball.pos.y = 0;
        
    }
}

