import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const StoriesCard = (props: { writing: string; date: string; quote: string }) => {
  const writing = props.writing
  const date = props.date
  const quote = props.quote
  
  return (
    <Card>
    <CardHeader>
      <CardTitle>{quote}</CardTitle>
      <CardDescription>{date}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>{writing}</p>
    </CardContent>
  </Card>
  )
}

export default StoriesCard