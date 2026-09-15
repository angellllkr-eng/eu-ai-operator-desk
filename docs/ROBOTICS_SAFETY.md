# Robotics Integration — Safety Envelope

Robotics is a bounded execution adapter. AI proposes and coordinates; the physical controller retains final authority.

## Command lifecycle

`PLAN → SAFETY_CHECK → ARM → EXECUTE → VERIFY → DISARM`

## Preconditions

A command may arm only when all are true:

- robot identity is authenticated
- site is authorized for the current region
- operator policy permits the command class
- emergency stop is clear
- heartbeat is current
- localization/state is healthy
- command timeout is within policy
- speed/force envelope is within policy
- command has an idempotency identifier

## Immediate hard stops

- emergency stop
- heartbeat loss
- localization loss
- unexpected obstacle or collision state
- command timeout
- thermal/current fault
- geofence breach
- unauthorized site or region
- operator cancellation

## Recovery

1. DISARM motion.
2. Preserve telemetry and command evidence.
3. Mark execution `BLOCKED`.
4. Require operator review.
5. Do not automatically resume physical motion.
6. Create an incident record.

## Robotics event schema

```json
{
  "event": "robot_command_rejected",
  "robot_id": "robot-001",
  "site_id": "site-eu-01",
  "command_id": "uuid",
  "reason": "HEARTBEAT_LOST",
  "severity": "CRITICAL",
  "timestamp": "2026-09-15T00:00:00Z"
}
```

## Separation of concerns

The AI control plane must never directly bypass the robot's hardware safety controller, firmware interlocks, emergency-stop chain, or site safety system.
