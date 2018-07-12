select incidents.id, state, injuries.name as injury, affectedareas.name as affectedarea, causes.name as cause from incidents
join injuries on incidents.injuryid = injuries.id
join affectedareas on injuries.affectedareaid = affectedareas.id
join causes on causes.id = incidents.causeid
