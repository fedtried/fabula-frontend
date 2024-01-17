import { Card, CardHeader, CardTitle, CardDescription, CardContent} from "../ui/card"

const StoriesCard = (props: { writing: string; date: string; quote: string }) => {
  let writing = props.writing
  let date = props.date
  let quote = props.quote
  
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