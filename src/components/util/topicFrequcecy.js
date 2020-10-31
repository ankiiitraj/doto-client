const getTopicWiseCount = (done, problems, topics) => {
	const promise = new Promise((resolve, reject) => {
		const numOfProblems = problems.length;
		const doneExpanded = Array(numOfProblems).fill(0);
		const res = Array(topics.length).fill(0);
		const total = Array(topics.length).fill(0);
	
		for(const item in done){
			doneExpanded[done[item]] = 1;
		}
		for(let i = 0; i < numOfProblems; ++i){
			const idx = topics.indexOf(problems[i].topic);
			if(doneExpanded[i]){
				res[idx]++;
			}
			total[idx]++;
		}
		const newRes = [];
		for(let i = 0; i < topics.length; ++i){
			newRes.push(({total: total[i], done: res[i]}));
		}
		resolve(newRes);
	})
	return promise;
};

export default getTopicWiseCount;