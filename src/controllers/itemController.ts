import { Request, Response } from 'express';

interface Item {
  id: number;
  name: string;
}

let items: Item[] = [];
let nextId = 1;

export const createItem = (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const newItem: Item = { id: nextId++, name };
  items.push(newItem);
  res.status(201).json(newItem);
};

export const getItems = (req: Request, res: Response) => {
  res.json(items);
};

export const getItem = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
};

export const updateItem = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  item.name = name;
  res.json(item);
};

export const deleteItem = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  items.splice(index, 1);
  res.status(204).send();
};
