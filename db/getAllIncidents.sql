select incidents.id, state, injuries.name as injury, affectedareas.name as affectedarea, causes.name as cause from incidents
join injuries on incidents.injuryid = injuries.id
join affectedAreas on injuries.affectedareaid = affectedareas.id
join causes on incidents.causeid = causes.id
