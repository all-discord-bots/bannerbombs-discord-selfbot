require('../../globals.js');

exports.run = async (bot,msg,args) => {
	try {
		if (args.length <= 0) {
			work_activated = true;
		} else {
			if (args[0] == 'stop' || args[0] == 'false' || args[0] == 'break') {
				work_activated = false;
			}
		}
		if (work_activated) {
			process.stdout.write(`[${Date()}] Successfully started auto working.\n`);
			msg.channel.send(`Successfully started auto working.`);
		} else {
			process.stdout.write(`[${Date()}] Successfully stopped auto working.\n`);
			msg.channel.send(`Successfully stopped auto working.`);
		}
		let channel = "305132995696656395";
		// My server - 345551930459684866
		// UnbelievaBoat's server - 305132995696656395
		await work(bot,channel,work_activated);
	} catch (err) {
		console.error(err.toString());
	}
};

const work = async (bot,channel,work_activated) => {
	const execute_work = setInterval(async() => {
		if (!work_activated) return clearInterval(execute_work);
		await bot.channels.get(channel).send("!work").then(() => {
			process.stdout.write(`[${Date()}] Successfully executed '!work' command.\n`);
		}).catch((err) => {
			console.error(err.toString());
		});
		const execute_dep_all = setTimeout(async() => {
			await bot.channels.get(channel).send("!dep all").then(() => {
				process.stdout.write(`[${Date()}] Successfully executed '!deposit all' command.\n`);
			}).catch((err) => {
				console.error(err.toString());
			});
			await execute_function(bot,channel,work_activated,execute_work,execute_dep_all);
		},1000);
	},2460000);
};

const execute_function = async (bot,channel,work_activated,execute_work,execute_dep_all) => {
	if (execute_work) {
		process.stdout.write(`[${Date()}] Successfully cleared '!work' interval.\n`);
		clearInterval(execute_work);
	}
	if (execute_dep_all) {
		process.stdout.write(`[${Date()}] Successfully cleared '!dep all' timeout.\n`);
		clearTimeout(execute_dep_all);
	}
	await work(bot,channel,work_activated);
};

exports.info = {
	name: 'work',
	usage: 'work',
	description: 'Work in unbelievaboats server automatically.'
};
