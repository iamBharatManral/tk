enum Status {
  TODO,
  IN_PROGRESS,
  DONE
}

type Task = {
  id: string,
  description: string,
  status: Status,
  createdAt: Date,
  updatedAt: Date
}
