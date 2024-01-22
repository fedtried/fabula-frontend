/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTimer } from 'react-timer-hook';

const Timer = ({ expiryTimestamp, onExpire }: {expiryTimestamp: any, onExpire:any}) => {
    const {
        seconds,
        minutes
      } = useTimer({ expiryTimestamp, onExpire: () => onExpire()});

    return (
        <div className="text-sm text-muted-foreground">
            <span >{minutes}</span>:<span>{seconds}</span>
        </div>
    )
}

export default Timer