import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const StoriesCard = (props: { writing: string; date?: string; quote?: string, name?: string }) => {
  const writing = props.writing
  const date = props.date
  const quote = props.quote
  const user = props.name
  
  return (
    <Card className="bg-white">{
      user ?
        <CardHeader>
          <CardDescription className="text-sm text-muted-foreground">@{user}</CardDescription>
        </CardHeader>
        :
        <CardHeader>
          <CardTitle className="header-text flex flex-row justify-between">
            "{quote}"
            <span className="text-sm body-text text-muted-foreground">{date}</span>
          </CardTitle>
        </CardHeader>
      }
      <CardContent>
        <p>{writing}</p>
      </CardContent>
    </Card>
  )
}

export default StoriesCard