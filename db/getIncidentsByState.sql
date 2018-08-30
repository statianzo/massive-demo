select incidents.id, state, injuries.name as injury, causes.name as cause, affectedareas.name as affectedarea from incidents
join injuries on incidents.injuryid = injuries.id
join causes on causes.id = incidents.causeid
join affectedareas on affectedareas.id = injuries.affectedareaid
where state = ${state}
