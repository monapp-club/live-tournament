// eslint-disable-next-line no-undef
let rankingTable = base.getTable("ranking");
// eslint-disable-next-line no-undef
let rankingPmTable = base.getTable("ranking_pm");

const sortByPoints = (a, b) => {
	const pointsA = a.getCellValueAsString('points');
	const pointsB = b.getCellValueAsString('points');
	return pointsB - pointsA;
}

const sortByDiff = (a, b) => {
	const diffA = a.getCellValueAsString('diff');
	const diffB = b.getCellValueAsString('diff');
	return diffB - diffA
}

// Get ranking records
const rankingRecords = await rankingTable.selectRecordsAsync({
	fields: ['team', 'name', 'category_id', 'diff', 'points', 'pool']
});

// Get ranking pm records
const rankingPmRecords = await rankingPmTable.selectRecordsAsync({ fields: ['id', 'category_id', 'pool'] })

const poolRankingRecords = rankingRecords.records.reduce((acc, cur) => {
	const category = cur.getCellValueAsString('category_id');
	const pool = cur.getCellValueAsString('pool');
	if (!acc[category]) {
		acc[category] = {};
	}
	if (!acc[category][pool]) {
		acc[category][pool] = [];
	}
	acc[category][pool].push(cur);
	return acc;
}, {})

const poolRankingPmRecords = rankingPmRecords.records.reduce((acc, cur) => {
	const category = cur.getCellValueAsString('category_id');
	const pool = cur.getCellValueAsString('pool');
	if (!acc[category]) {
		acc[category] = {};
	}
	if (!acc[category][pool]) {
		acc[category][pool] = [];
	}
	acc[category][pool].push(cur);
	return acc;
}, {})

const recordsToCreate = [];

const calculateRecordIndexForPoolC = (index) => {
	return index;
}

const calculatePoolC = (index) => {
	return 'Poule 1';
}

const getRankingPmRecord = (category, pool, index) => {
	return poolRankingPmRecords[category][pool][index];
}

Object.keys(poolRankingRecords).forEach((categoryKey) => {
	const categoryPools = poolRankingRecords[categoryKey];
	const isCategoryC = categoryKey === 'u12-c' || categoryKey === 'u10-c';
	Object.keys(categoryPools).forEach((categoryPoolKey, categoryPoolIndex) => {
		const teamsPools = categoryPools[categoryPoolKey].sort(sortByDiff).sort(sortByPoints);
		teamsPools.forEach((team, index) => {
			const teamRecord = team.getCellValue('team');
			const newPool = isCategoryC ? calculatePoolC(index) : `Poule ${index + 1}`;
			const recordIndex = isCategoryC ? calculateRecordIndexForPoolC(index) : categoryPoolIndex;
			const recordId = getRankingPmRecord(categoryKey, newPool, recordIndex)?.id;
			if (!recordId || !teamRecord) {
				console.log('ERROR with', categoryKey, newPool, index)
				return;
			}
			recordsToCreate.push({
				id: recordId,
				fields: {
					team: teamRecord,
				}
			})
		})
	})
})

console.log(recordsToCreate)

for (let i = 0; i < recordsToCreate.length; i += 50) {
	await rankingPmTable.updateRecordsAsync(recordsToCreate.slice(i, i + 50));
}