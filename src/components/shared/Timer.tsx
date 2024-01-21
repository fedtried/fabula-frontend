import { useTimer } from 'react-timer-hook';

const Timer = ({ expiryTimestamp, onExpire }) => {
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