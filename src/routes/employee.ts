import { Request, Response } from "express";

export let getEmployee = (req: Request, res: Response): void => {
  res.json({
    message: 'GET Employee'
  })
}

export let postEmployee = (req: Request, res: Response): void => {
  res.json({
    message: 'POST Employee'
  })
}

export let putEmployee = (req: Request, res: Response): void => {
  res.json({
    message: 'PUT Employee'
  })
}

export let deleteEmployee = (req: Request, res: Response): void => {
  res.json({
    message: 'DELETE Employee'
  })
}
