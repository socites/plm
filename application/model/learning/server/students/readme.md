# List of Actions

## /list
### Parameters
* next
### Returns
Array of {id, time_updated}
example : 
```
{"records": [], "next": value}
```
## /data
### Parameters
* ids
### Returns
{id: data}

## /tu
### Parameters
* ids
### Returns
{id: time_updated}

## /publish
### Parameters
* id
* name
### Returns
{id: {id, time_updated, field_1[, field_2, ...]}}
