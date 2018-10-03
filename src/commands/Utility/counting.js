exports.run = async (bot,msg,args) => {
	try {
		let info = {
			base: 10,
			by: 1,
			messages_sent: 0
		}
		await msg.channel.send("Successfully started auto counting.\n").then(() => {
			process.stdout.write(`[${Date()}] Successfully started auto counting.\n`);
		});
		let channel = "360228611489267713";
		// My server - 345551930459684866
		await count(bot,channel,args,info);
	} catch (err) {
		console.error(err.toString());
	}
};

const count = async (bot,channel,args,info) => {
	let base = info.base;
	let by = info.by;
	let messages_sent = info.messages_sent;

	const execute_counting = setInterval(async() => {
		await bot.channels.get(channel).fetchMessages(1).then(async(message) => {
			if (messages_sent >= args[0]) {
				process.stdout.write(`[${Date()}] Sent ${messages_sent}/${args[0]} messages.\n`);
				return clearInterval(execute_counting);
			}
			let current_number = message.find((m) => parseNumber(base,by,m) > 0);
			await bot.channels.get(channel).send(`${++current_number}`).then(() => {
				messages_sent++;
				process.stdout.write(`[${Date()}] Next number is ${++current_number}\n`);
			}).catch((err) => {
				console.error(err.toString());
			});
		});
		await execute_function(bot,channel,args,execute_counting,info);
	},6000);
};

const execute_function = async (bot,channel,args,execute_counting,info) => {
	if (execute_counting) {
		process.stdout.write(`[${Date()}] Successfully cleared counting interval\n`);
		clearInterval(execute_counting);
	}
	await count(bot,channel,args,info);
};

const parseNumber = ((base,by,message) => {
	if (by % 1 !== 0) return parseFloat(message.content);
	if (message.content.search(/^\d+\.[1-9]/) !== -1) return NaN;
	return parseInt(message.content.replace(/ .*/,''),base);
});

exports.info = {
	name: 'startcount',
	usage: 'startcount <times to count>',
	description: 'Count in unbelievaboats server automatically.'
};
