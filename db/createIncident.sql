insert into incidents(state, causeid, injuryid)
values (${state}, ${causeid}, ${injuryid})
returning *

