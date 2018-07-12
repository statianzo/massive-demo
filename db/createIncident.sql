insert into incidents(state, injuryid, causeid)
values(${state}, ${injuryid}, ${causeid})
returning *
